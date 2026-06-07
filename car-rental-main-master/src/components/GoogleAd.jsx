import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, DISPLAY_AD_SLOT } from "../config/adsense";

function GoogleAd({ adSlot = DISPLAY_AD_SLOT, className = "" }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adSlot || pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [adSlot]);

  if (!adSlot) return null;

  return (
    <div className={`ad-container ${className}`.trim()}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default GoogleAd;
