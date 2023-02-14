import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState, useRef } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import ReactPlayer from "react-player";

import ChatBox from "./ChatBox";

export default function ChatRoom(props) {
  const id = props.match.params.id;

  const [inputMessage, setInputMessage] = useState("");

  const [chatBoxList, setChatBoxList] = useState([]);

  const [viedeoUrl, setVideoUrl] = useState("");

  const changeVideoUrl = (e) => {
    setVideoUrl(e.target.value);
  };

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    seller: 0,
    quantity: 1,
  });

  const productOnChage = (e) => {};

  const chatBoxScroll = useRef();

  const onChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 유저데이터가 있는지 체크

  const userdata = JSON.parse(localStorage.getItem("userdata"));

  const sellerRight = localStorage.getItem("sellerSuccess");

  const handlekeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("엔터체크");
      sendMessage();
    }
  };

  const sendMessage = () => {
    let formData = new FormData();
    formData.append("roomNum", id);
    formData.append("sender", userdata.nickName);
    formData.append("msg", inputMessage);
    formData.append("profile", userdata.picture);

    const requestProduct = requestPostHaveToken(
      "/auction-chat/user/send-message",
      props,
      formData
    );

    setInputMessage(" ");
    requestProduct.then(() => {
      chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;
    });
  };

  useEffect(() => {
    if (!!userdata) {
      console.log("로그인 되어있습니다.");

      if (!!sellerRight) {
        setProduct({
          name: "",
          price: 0,
          seller: Number(sellerRight),
          quantity: 1,
        });
      }
    } else {
      console.log("로그인 정보없음");
    }

    const eventSource = new EventSource(
      "http://localhost:8000/auction-chat/auth/find-room/" + id
    );

    eventSource.onmessage = (event) => {
      console.log(1, event);
      const data = JSON.parse(event.data);
      console.log(2, data);

      setChatBoxList((preChatList) => [...preChatList, data]);
      chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;
    };

    // requestGetHaveToken("/auction-chat/auth/find-room/" + id).then((data) => {
    //   console.log("data");
    //   console.log(data);
    // });
  }, []);

  console.log("리스트");
  console.log(chatBoxList);
  console.log(product);

  return (
    <div className="chat-main-container container-fluid ">
      <div className="chat-main-child-container row">
        <div className="col-sm vh-100 min-vh-60">
          {!!sellerRight && (
            <div>
              <div>
                {viedeoUrl.length < 1 && (
                  <div>
                    <p>
                      만약 방송중이시라면 링크입력해주셔서 동시에 확인해주세요
                    </p>
                    <label htmlFor="videoUrl">라이브 링크</label>
                    <input
                      onChange={changeVideoUrl}
                      id="videoUrl"
                      type="text"
                    />
                    <button className="btn btn-dark">입력</button>
                  </div>
                )}
              </div>
              {viedeoUrl.length > 1 && (
                <div className="player-box">
                  <ReactPlayer url={viedeoUrl} />
                </div>
              )}
              <div>
                <label htmlFor="productName">제품이름</label>
                <input id="productName" type="text" />
                <label htmlFor="productPrice">제품가격</label>
                <input id="productPrice" type="number" />
                <button className="btn btn-dark">제품 올리기</button>
              </div>
              판매자가 물건리스트, 판매 삭제하는 컨트롤러
            </div>
          )}

          <div>지금 판매물품 내용, 경매 실시간 반영</div>
        </div>
        <div className="col h-100">
          <div className="chat-box-div col-sm chat-ground" ref={chatBoxScroll}>
            {chatBoxList.length > 0 &&
              chatBoxList.map((data, idx) => {
                return (
                  <ChatBox
                    key={idx}
                    msg={data.msg}
                    profile={data.profile}
                    userdata={userdata}
                    sender={data.sender}
                  />
                );
              })}
          </div>
          <div className="chat-input-div">
            <input
              className="chat-input"
              onKeyDown={handlekeyPress}
              onChange={onChange}
              value={inputMessage}
              type="text"
            />
            <button
              onClick={() => {
                sendMessage();
              }}
              className="btn btn-dark"
            >
              입력
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
