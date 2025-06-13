import { useState } from "react";

const ResourceModal = ({ url, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-full max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl font-bold"
        >
          &times;
        </button>
        <div className="aspect-video w-full">
          {/* <iframe
            src={`${url}?autoplay=1&muted=1`}
            title="Resource Video"
            width="100%"
            height="100%"
            className="rounded shadow"
            allow="autoplay; microphone; fullscreen; encrypted-media"
            allowFullScreen
          ></iframe> */}
          <iframe
            src="http://embed.vidello.com/4945/aboc5e3xkfbyme4w/player.html?autoplay=1&muted=1&controls=1"
            title="Resource Video"
            width="100%"
            height="100%"
            className="rounded shadow"
            allow="autoplay; microphone; fullscreen; encrypted-media"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ResourceModal;
