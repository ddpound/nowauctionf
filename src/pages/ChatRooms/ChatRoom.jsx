import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import ReactPlayer from "react-player";
import ReactHlsPlayer from "react-hls-player/dist";

import ChatBox from "./ChatBox";
import ProductBox from "./ProductBox";

export default function ChatRoom(props) {
  // 방 ID
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
    roomNum: id,
    auction: false,
  });

  const productOnChage = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const [productList, setProductList] = useState([]);

  const saveProduct = () => {
    const saveProduct = requestPostHaveToken(
      "/auction-chat/seller/product/save",
      props,
      product
    );
  };

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
    requestProduct.then((res) => {
      if (res.data == null) {
        alert("종료된 채팅방입니다. 홈으로가주세요");
      }
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
          roomNum: id,
          auction: false,
        });

        // 판매자는 url을 받을필요가 없음
      }
    } else {
      console.log("로그인 정보없음");
    }

    requestGetHaveToken(
      "http://localhost:8000/auction-chat/auth/find-room/" +
        id +
        "/check-video-url",
      props
    ).then((res) => {
      console.log("방 체크, 방 url검사를 위해서");

      setVideoUrl(res.data.videoUrl);
    });
  }, []);

  useEffect(() => {
    chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;
  }, [chatBoxList]);

  const [locationKeys, setLocationKeys] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8000/auction-chat/auth/find-room/" + id
    );

    // 제품 SSE 부분
    const eventSourceProductCheck = new EventSource(
      "http://localhost:8000/auction-chat/auth/find-product/" + id
    );

    eventSource.onmessage = (event) => {
      // console.log(1, event);
      const data = JSON.parse(event.data);
      // console.log(2, data);

      setChatBoxList((preChatList) => [...preChatList, data.body]);
    };

    eventSourceProductCheck.onmessage = (event) => {
      //console.log(1, event);
      const data = JSON.parse(event.data);
      //console.log(2, data);

      setProductList((productList) => [...productList, data.body]);
    };

    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
        console.log("다른링크");

        eventSource.close();
        eventSourceProductCheck.close();
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // 앞으로 가기
          console.log("앞으로가기");
          eventSource.close();
          eventSourceProductCheck.close();
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // 뒤로 가기
          console.log("뒤로가기");
          eventSource.close();
          eventSourceProductCheck.close();
        }
      }
    });
  }, [locationKeys, history]);

  return (
    <div className="chat-main-container ">
      <div className="chat-main-child-container row">
        <div className="col-sm vh-100 min-vh-60">
          {!!sellerRight && (
            <div className="accordion mt-2 " id="accordionExample">
              <div className="accordion-item ">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#seller-controller"
                    aria-expanded="true"
                    aria-controls="seller-controller"
                  >
                    관리창 펼치기/접기
                  </button>
                </h2>
                <div
                  id="seller-controller"
                  className="accordion-collapse  collapse show "
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body ">
                    <div className="seller-main-controller">
                      <p>
                        만약 방송중이시라면 링크입력해주세요. 주소 변경시 다른
                        유저들도 새로고침하셔야합니다.
                      </p>
                      <div className="sellerLiveController">
                        <div>
                          <div>
                            <label htmlFor="videoUrl">라이브 링크</label>
                            <input
                              onChange={changeVideoUrl}
                              id="videoUrl"
                              type="text"
                            />

                            <button className="btn btn-dark">
                              입력 및 수정
                            </button>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="productName">제품이름</label>
                          <input
                            id="productName"
                            name="name"
                            onChange={productOnChage}
                            type="text"
                          />
                          <label htmlFor="productPrice">제품가격</label>
                          <input
                            id="productPrice"
                            name="price"
                            onChange={productOnChage}
                            type="number"
                          />
                          <label htmlFor="auction">경매</label>
                          <input
                            id="auction"
                            name="auction"
                            onChange={productOnChage}
                            type="checkbox"
                          />
                          <button
                            onClick={saveProduct}
                            className="btn btn-dark"
                          >
                            제품 올리기
                          </button>
                        </div>
                        <div>
                          물건 리스트
                          {productList.length > 0 &&
                            productList.map((product) => {
                              return <p>{product.name}</p>;
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viedeoUrl.length > 1 && (
            <div className="accordion mt-2 " id="accordionExample">
              <div className="accordion-item ">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    동영상 보이기/숨기기
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse  collapse show "
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body ">
                    <div className="player-box">
                      <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        playing={true}
                        url={viedeoUrl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="accordion mt-2 " id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sell-product"
                  aria-expanded="true"
                  aria-controls="sell-product"
                >
                  판매물품 보기/접기
                </button>
              </h2>
              <div
                id="sell-product"
                className="accordion-collapse  collapse show "
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body ">
                  <div>지금 판매물품 내용, 경매 실시간 반영</div>
                  <ProductBox
                    productList={productList}
                    roomNum={id}
                    userdata={userdata}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col h-100">
          <div className="chat-box-div col-sm" ref={chatBoxScroll}>
            {chatBoxList.length > 0 &&
              chatBoxList.map((data, idx) => {
                if (!!data) {
                  return (
                    <ChatBox
                      key={idx}
                      msg={data.msg}
                      profile={data.profile}
                      userdata={userdata}
                      sender={data.sender}
                    />
                  );
                }
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
