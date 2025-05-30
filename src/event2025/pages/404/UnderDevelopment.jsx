import { Construction } from "lucide-react";

export default function UnderDevelopment() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="    p-6">
        <div className="text-center border-4 border-red-600 bg-blue-700 backdrop-blur-lg rounded-2xl p-10 border border-white/10 shadow-2xl max-w-md">
          <div className="flex justify-center mb-6  animate-bounce text-yellow-400">
            <Construction size={60} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Page Under Development
          </h1>
          <p className="text-gray-300 mb-6">
            We're working hard to bring this feature to life. Please check back
            soon!
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-700 hover:bg-blue-600 border text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
