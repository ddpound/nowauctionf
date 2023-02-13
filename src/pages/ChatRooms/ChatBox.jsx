import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const ChatBox = ({ msg, profile, sender, userdata }) => {
  if (userdata.nickName === sender) {
    return (
      <div className="ChatBox-compoenet">
        <div className="ChatBox-profile-Box">
          <img className="chat-profile" src={userdata.picture} alt="" />
          <label>{sender}</label>
        </div>
        <div>
          <label>{msg}</label>
        </div>
      </div>
    );
  } else {
    return (
      <div className="ChatBox-compoenet">
        <div className="ChatBox-profile-Box">
          <img className="chat-profile" src={profile} alt="" />
          <label>{sender}</label>
        </div>
        <div>
          <label>{msg}</label>
        </div>
      </div>
    );
  }
};

export default ChatBox;
