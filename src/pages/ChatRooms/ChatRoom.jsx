import "bootstrap/dist/js/bootstrap.bundle";

import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import ReactPlayer from "react-player";

import ChatBox from "./ChatBox";
import ProductBox from "./ProductBox";

import "./ChatRoom.scss";

export default function ChatRoom(props) {
  // 방 ID
  const id = props.match.params.id;

  const [inputMessage, setInputMessage] = useState("");

  const [chatBoxList, setChatBoxList] = useState([]);

  const [viedeoUrl, setVideoUrl] = useState("");

  const [userInfoAccordion, setUserInfoAccordion] = useState(true);
  const [userInfoChatDiv, setUserInfoChatDiv] = useState({
    sender: "",
  });

  const changeUserInfoAccordion = (sender) => {
    setUserInfoChatDiv({ sender: sender });
    setUserInfoAccordion(false);
  };

  const [chatRoom, setChatRoom] = useState({
    chief: "",
    chiefId: 0,
    createAt: {},
    id: "",
    roomNum: 0,
    roomTitle: "",
    thumbnail: "",
    videoUrl: "",
  });

  const changeVideoUrl = (e) => {
    setVideoUrl(e.target.value);
  };

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    seller: 0,
    quantity: 1,
    roomNum: id,
    auctionState: false,
    auction: false,
  });

  const productOnChange = (e) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const auctionOnChange = (e) => {
    setProduct({
      ...product,
      auction: e.target.checked,
    });
  };

  const [productList, setProductList] = useState([]);

  const [chatUserList, setChatUserList] = useState([]);

  const chatUserIsDuplicate = (sender) => {
    return chatUserList.some((user) => user === sender);
  };

  const addChatUserList = (sender) => {
    if (!chatUserIsDuplicate(sender)) {
      console.log(sender);
      setChatUserList((chatUserList) => [...chatUserList, sender]);
    }
  };

  const saveProduct = () => {
    requestPostHaveToken(
      "/auction-chat/seller/product/save",
      props,
      product
    ).then((res) => {
      setProduct({
        ...product,
        auction: false,
      });
    });
  };

  const changeAuctionState = () => {
    if (productList.length > 0) {
      requestPostHaveToken(
        "/auction-chat/seller/product/change-auction",
        props,
        {
          product: productList[productList.length - 1],
          raisePrice: 0,
          userdata: userdata,
        }
      ).then((res) => {
        console.log(res);
      });
    } else {
      alert("등록된 제품이 없습니다.");
    }
  };

  const chatBoxScroll = useRef();

  const onChange = (e) => {
    setInputMessage(e.target.value);
  };

  // 유저데이터가 있는지 체크
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  // 판매자이면, 방 만든사람과 판매자를 구별해내서 검사해야함
  const sellerRight = localStorage.getItem("sellerSuccess");

  const handlekeyPress = (e) => {
    if (e.key == "Enter") {
      console.log("엔터체크");
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputMessage == "" || inputMessage.length == 0) {
      alert("한 글자라도 입력해주세요!");
      return;
    }

    if (!!userdata) {
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

      setInputMessage("");
      requestProduct.then((res) => {
        if (res.data == null) {
          alert("종료된 채팅방입니다. 홈으로가주세요");
        }
        chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;
      });
    } else {
      alert("로그인이 필요합니다.");
    }
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
          auctionState: false,
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
      console.log(res);

      setChatRoom(res.data);
      setVideoUrl(res.data.videoUrl);
    });
  }, []);

  useEffect(() => {
    chatBoxScroll.current.scrollTop = chatBoxScroll.current.scrollHeight;

    if (!!chatBoxList && chatBoxList.length > 0) {
      chatBoxList.map((chat) => {
        console.log(chat.sender);

        if (chatUserList.length > 0) {
          if (!chatUserList.some((sender) => sender === chat.sender)) {
            return setChatUserList((chatUserList) => [
              ...chatUserList,
              chat.sender,
            ]);
          }
        } else {
          return setChatUserList((chatUserList) => [
            ...chatUserList,
            chat.sender,
          ]);
        }
      });
    }
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
      //console.log(1, event);
      const data = JSON.parse(event.data);
      //console.log(2, data);
      setChatBoxList((preChatList) => [...preChatList, data.body]);
    };

    eventSourceProductCheck.onmessage = (event) => {
      //console.log(1, event);
      const data = JSON.parse(event.data);

      //console.log(2, data);

      setProductList((productList) => {
        console.log(productList.length);

        if (productList.length > 0) {
          if (productList[productList.length - 1].id == data.body.id) {
            productList.pop();
          }
        }

        return [...productList, data.body];
      });
    };

    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);

        eventSource.close();
        eventSourceProductCheck.close();
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          eventSource.close();
          eventSourceProductCheck.close();
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

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
          {!!sellerRight && userdata.nickName === chatRoom.chief && (
            <div
              className="custom-accordion accordion mt-2"
              id="accordionExample"
            >
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
                      {/* <p>
                        만약 방송중이시라면 링크입력해주세요. 주소 변경시 다른
                        유저들도 새로고침하셔야합니다.
                      </p> */}
                      <div className="sellerLiveController">
                        {/* <div>
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
                        </div> */}

                        <div>
                          {productList.length > 0 &&
                            !!productList[productList.length - 1].auction &&
                            !productList[productList.length - 1]
                              .auctionState && (
                              <div
                                style={{ width: "100%", margin: "10px 20px" }}
                              >
                                <label htmlFor="productName">제품이름</label>
                                <input
                                  id="productName"
                                  name="name"
                                  onChange={productOnChange}
                                  type="text"
                                />

                                <label htmlFor="productPrice">제품가격</label>
                                <input
                                  id="productPrice"
                                  name="price"
                                  onChange={productOnChange}
                                  type="number"
                                />

                                {!product.auction && (
                                  <div>
                                    <label htmlFor="productQuantity">
                                      제품수량
                                    </label>
                                    <input
                                      id="productQuantity"
                                      name="quantity"
                                      onChange={productOnChange}
                                      type="number"
                                    />
                                  </div>
                                )}
                                <label htmlFor="auction">경매</label>
                                <input
                                  id="auction"
                                  name="auction"
                                  onChange={auctionOnChange}
                                  type="checkbox"
                                />
                                <button
                                  onClick={saveProduct}
                                  className="btn btn-dark"
                                >
                                  제품 올리기
                                </button>
                              </div>
                            )}

                          {productList.length > 0 &&
                            !!productList[productList.length - 1].auction && (
                              <div style={{ width: "100%", marginTop: "10px" }}>
                                <button
                                  style={{ margin: "10px 20px", width: "50%" }}
                                  onClick={changeAuctionState}
                                  className="btn btn-dark"
                                >
                                  {productList[productList.length - 1]
                                    .auctionState ? (
                                    <label>경매중지</label>
                                  ) : (
                                    <label>경매시작</label>
                                  )}
                                </button>

                                {productList[productList.length - 1]
                                  .auctionState ? (
                                  <p
                                    style={{
                                      margin: "10px 20px",
                                      color: "red",
                                    }}
                                  >
                                    경매가 진행중입니다.
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      margin: "10px 20px",
                                      color: "red",
                                    }}
                                  >
                                    경매가 중지 됐습니다.
                                  </p>
                                )}
                                <p
                                  style={{ margin: "10px 20px", color: "red" }}
                                >
                                  경매 중지를 누르시고 <br />
                                  다음제품을 추가시키면 <br />
                                  경매가 자동적으로 종료됩니다.
                                </p>
                              </div>
                            )}
                        </div>
                        <div className="product-list-div">
                          <p>물건 리스트</p>
                          {productList.length > 0 &&
                            productList.map((product) => {
                              return <p key={product.id}>{product.name}</p>;
                            })}
                        </div>
                        <div>
                          <p>채팅 참가자</p>
                          {!!chatUserList &&
                            chatUserList.length > 0 &&
                            chatUserList.map((user, idx) => {
                              return <p key={idx}>{user}</p>;
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
            <div
              className="custom-accordion accordion mt-2 "
              id="accordionExample"
            >
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
          {!!userdata && (
            <div
              className="custom-accordion accordion mt-2 "
              id="accordionExample"
            >
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
                    <ProductBox
                      productList={productList}
                      roomNum={id}
                      props={props}
                      userdata={userdata}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
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
                      changeUserInfoAccordion={changeUserInfoAccordion}
                    />
                  );
                }
              })}
            <div hidden={userInfoAccordion} className="user-chat-info-absolute">
              <div>유저 정보 클릭시 보여주기</div>
              <div>{userInfoChatDiv.sender}</div>
              <button className="btn btn-info">채팅금지하기</button>
              <button className="btn btn-danger">강퇴하기</button>
              <button
                onClick={() => {
                  setUserInfoAccordion(true);
                }}
                className="btn btn-dark"
              >
                닫기
              </button>
            </div>
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
