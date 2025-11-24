import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { appID, serverSecret } from "./config";

const Room = () => {
  const { roomId } = useParams();

  const meeting = async (element) => {
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      Date.now().toString()
    );

    const zc = ZegoUIKitPrebuilt.create(token);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
      sharedLink: [
        {
          name: "Copy Link",
          url: `window.location.href`,
        },
      ],
    });
  };

  return <div ref={meeting} style={{ width: "100vw", height: "100vh" }}></div>;
};

export default Room;
