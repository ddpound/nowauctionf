import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const ChatBox = ({ msg, sender }) => {
  return (
    <div>
      <div>
        {sender} : {msg}
      </div>
    </div>
  );
};

export default ChatBox;
