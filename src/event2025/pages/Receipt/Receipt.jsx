import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Receipt from "../../components/ReceiptComponent/Receipt";
import { useAuth } from "../../contexts/LoginContext";
import { checkIsReceipt } from "../../Services/dashboardFunction/checkReceiptAvailabe";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const stateReceiptData = location.state?.receiptData || null;

  const [receiptData, setReceiptData] = useState(stateReceiptData);
  const [loading, setLoading] = useState(!stateReceiptData);
  const [renderReady, setRenderReady] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const checkReceipt = async () => {
      setLoading(true);
      try {
        const response = await checkIsReceipt(user);
        if (response.data.rs == 1) {
          setReceiptData(response.data.res);
          console.log("recipet", response);
        } else {
          console.warn("Receipt check failed:", response.data);
        }
      } catch (error) {
        console.error("Error fetching receipt data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!stateReceiptData && user) {
      checkReceipt();
    }
  }, [stateReceiptData, user]);

  useEffect(() => {
    if (receiptData) {
      const timer = setTimeout(() => {
        setRenderReady(true);
      }, 500); // Adjust for smoother transition
      return () => clearTimeout(timer);
    }
  }, [receiptData]);

  const receiptRef = useRef();

  const downloadPDF = async () => {
    try {
      setLoader(true);
      const element = receiptRef.current;
      if (!element) return;

      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        pdfWidth,
        imgHeight,
        undefined,
        "FAST"
      );
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          position,
          pdfWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pdfHeight;
      }
      setLoader(false);
      pdf.save(receiptData.RegistrationNo);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <div className="my-10">
      {loading || !renderReady ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : receiptData ? (
        <div className="flex flex-col justify-center">
          <div className="float-right my-10 flex items-center justify-center">
            <button
              onClick={downloadPDF}
              className="float-right bg-blue px-6 py-3 text-white rounded"
            >
              {loader ? "Downloading....." : "Download as PDF"}
            </button>
          </div>
          <div ref={receiptRef}>
            <Receipt data={receiptData} />
          </div>
        </div>
      ) : (
        <p className="text-center text-red-600 font-semibold">
          No receipt data found.
        </p>
      )}
    </div>
  );
};

export default ReceiptPage;
