import React from 'react';
import { TelegramShareButton, TelegramIcon } from "react-share";

const ShareLocationButton = () => {
    return (
        <TelegramShareButton url={window.location.href}>
            <TelegramIcon size={30} round style={{marginTop: 10}}/>
        </TelegramShareButton>
    );
};

export default ShareLocationButton;