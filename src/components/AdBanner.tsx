import { useEffect } from 'react';
import { GOOGLE_ID, GOOGLE_SLOT } from '../config';
import type { UserResponse } from '../types';
import { Plan } from '../enums';

interface AdBannerProps {
    user?: UserResponse;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    className?: string;
}

export const AdBanner = ({
    user,
    dataAdFormat = "auto",
    dataFullWidthResponsive = true,
    className = ""
}: AdBannerProps) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("Error Loading Ad:", err);
        }
    }, []);

    if(!GOOGLE_ID || (user && user.plan !== Plan.FREE)) return <></>;

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
};