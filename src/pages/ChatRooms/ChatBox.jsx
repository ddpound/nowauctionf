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
      <div>
        <div>
          <img className="chat-profile" src={userdata.picture} alt="" />{" "}
          {sender} : {msg}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <img className="chat-profile" src={profile} alt="" /> {sender} : {msg}
        </div>
      </div>
    );
  }
};

export default ChatBox;
