import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

export default function ChatRoom(props) {
  const id = props.match.params.id;

  const [inputMessage, setInputMessage] = useState("");

  const onChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 유저데이터가 있는지 체크

  const userdata = JSON.parse(localStorage.getItem("userdata"));

  const handlekeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("엔터체크");
      sendMessage();
    }
  };

  const sendMessage = () => {
    let formData = new FormData();
    formData.append("sender", userdata.nickName);
    formData.append("msg", inputMessage);
    formData.append("roomNum", id);

    const requestProduct = requestPostHaveToken(
      "/auction-chat/user/send-message",
      props,
      formData
    );
  };

  useEffect(() => {
    if (!!userdata) {
      console.log("로그인 되어있습니다.");
    } else {
      console.log("로그인 정보없음");
    }

    // requestGetHaveToken("/auction-chat/auth/find-room/" + id).then((data) => {
    //   console.log("data");
    //   console.log(data);
    // });

    const eventSource = new EventSource(
      "http://localhost:8000/auction-chat/auth/find-room/" + id
    );

    eventSource.onmessage = (event) => {
      console.log(1, event);
      const data = JSON.parse(event.data);
      console.log(2, data);
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm vh-100 min-vh-60">방송화면div</div>
        <div className="col-sm">
          <div className="row h-50">
            <div className="row-sm">현재 판매 물품 내용</div>
            <div className="row-sm">컨트롤러가 있는 div 버튼들 포함</div>
          </div>
          <div className="row h-50">
            <div className="col-sm chat-ground">채팅창</div>
            <div className="chat-input-div">
              <input
                className="chat-input"
                onKeyDown={handlekeyPress}
                onChange={onChange}
                type="text"
              />
              <button className="btn btn-dark">입력</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
