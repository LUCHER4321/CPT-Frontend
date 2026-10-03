import { useEffect } from 'react';
import { ADSTERRA_CONTAINER_ID, ADSTERRA_SRC, GOOGLE_ID, GOOGLE_SLOT } from '../config';
import type { UserResponse } from '../types';
import { AdMethod, Plan } from '../enums';

interface AdBannerProps {
    user?: UserResponse;
    method?: AdMethod;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    className?: string;
}

export const AdBanner = ({
    user,
    method = AdMethod.ADSTERRA,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
    className = ""
}: AdBannerProps) => {
    if (user && user.plan !== Plan.FREE) return <></>;
    
    useEffect(() => {
        switch(method){
            case AdMethod.GOOGLE_ADSENSE:
                if (!GOOGLE_ID) return;
                let metaTag = document.querySelector('meta[name="google-adsense-account"]');
                if (!metaTag) {
                    metaTag = document.createElement('meta');
                    metaTag.setAttribute('name', 'google-adsense-account');
                    metaTag.setAttribute('content', GOOGLE_ID);
                    document.head.appendChild(metaTag);
                }
                let scriptTag = document.querySelector('script[src*="adsbygoogle.js"]');
                if (!scriptTag) {
                    scriptTag = document.createElement('script');
                    scriptTag.setAttribute('async', 'true');
                    scriptTag.setAttribute('src', `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ID}`);
                    scriptTag.setAttribute('crossorigin', 'anonymous');
                    document.head.appendChild(scriptTag);
                }
                try {
                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (err) {
                    console.error("Error Loading Ad:", err);
                }
                break;
            case AdMethod.ADSTERRA:
                if (!ADSTERRA_SRC) return;
                const adsterraScript = document.createElement('script');
                adsterraScript.src = ADSTERRA_SRC;
                adsterraScript.async = true;
                document.body.appendChild(adsterraScript);
        }
    }, []);
    
    switch (method) {
        case AdMethod.GOOGLE_ADSENSE:
            if(!GOOGLE_ID) return <></>;
            return (
                <div className={`ad-container my-4 flex justify-center ${className}`}>
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block' }}
                        data-ad-client={GOOGLE_ID}
                        data-ad-slot={GOOGLE_SLOT}
                        data-ad-format={dataAdFormat}
                        data-full-width-responsive={dataFullWidthResponsive.toString()}
                    />
                </div>
            );
        case AdMethod.ADSTERRA:
            if(!ADSTERRA_SRC || !ADSTERRA_CONTAINER_ID) return <></>;
            return (
                <div className={`ad-container my-4 flex justify-center ${className}`}>
                    <div id={ADSTERRA_CONTAINER_ID} />
                </div>
            );
    }
};