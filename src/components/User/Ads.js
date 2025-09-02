import React, { useState, useEffect } from "react";
import { loadAd } from "../../utils/adsutils.js";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Ads = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adData, setAdData] = useState(null);

  // Load ads once
  useEffect(() => {
    loadAd(setAdData);
  }, []);

  // Rotate ads automatically
  useEffect(() => {
    if (!adData || !adData.data?.length) return;

    const intervalId = setInterval(() => {
      setCurrentAdIndex(
        (prevIndex) => (prevIndex + 1) % adData.data.length
      );
    }, 5000); // Change ad every 5s

    return () => clearInterval(intervalId);
  }, [adData]);

  if (!adData) {
    return <div className="text-center p-4">Loading ads...</div>;
  }

  const goPrev = () => {
    setCurrentAdIndex(
      (prev) => (prev - 1 + adData.data.length) % adData.data.length
    );
  };

  const goNext = () => {
    setCurrentAdIndex(
      (prev) => (prev + 1) % adData.data.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
      >
        {adData.data.map((ad) => (
          <div key={ad._id} className="w-full flex-none relative">
            {/* Sponsored Tag */}
            <span className="absolute top-3 left-3 bg-yellow-400 text-gray-900 text-xs font-semibold px-2 py-1 rounded">
              Sponsored
            </span>

            <Link to={ad.product_Url}>
              {ad.type === "video" ? (
                <video
                  src={ad.url}
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full h-[350px] object-cover"
                  onError={(e) => {
                    e.currentTarget.poster =
                      "https://placehold.co/1200x350/E2E8F0/1A202C?text=Video+Unavailable";
                  }}
                />
              ) : (
                <img
                  src={ad.url}
                  alt={ad.title}
                  className="w-full h-[350px] object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/1200x350/E2E8F0/1A202C?text=Image+Unavailable";
                  }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
      >
        <AiOutlineLeft size={28} />
      </button>

      <button
        onClick={goNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-white"
      >
        <AiOutlineRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {adData.data.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === currentAdIndex ? "bg-gray-900" : "bg-gray-400"
            }`}
            onClick={() => setCurrentAdIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Ads;
