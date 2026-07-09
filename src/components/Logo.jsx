import React, { useEffect, useState } from "react";
import logoSrc from "@/assets/Nav/image 11.png";

function Logo({ className = "h-12", withBg = false }) {
  const [processedSrc, setProcessedSrc] = useState(logoSrc);

  useEffect(() => {
    if (withBg) {
      setProcessedSrc(logoSrc);
      return;
    }

    const img = new Image();
    img.src = logoSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Loop through all pixels and make near-white pixels transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If the pixel is very light/white, make it transparent
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // alpha
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
    img.onerror = () => {
      // Fallback in case of loading error
      setProcessedSrc(logoSrc);
    };
  }, [withBg]);

  if (withBg) {
    return (
      <div className="bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
        <img src={processedSrc} alt="AD TOKER" className={className} />
      </div>
    );
  }

  return <img src={processedSrc} alt="AD TOKER" className={className} />;
}

export default Logo;
