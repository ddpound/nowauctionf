import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";
import MainSellerPageList from "../components/MainSellerPageList/MainSellerPageList";

import ChatRoomList from "./ChatRoomShowList/Components/ChatRoomList";

import { Cookies } from "react-cookie";

import "./Index.scss";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

// 글이 없을때는 열린 장이 없습니다.

export default function Index(props) {
  const cookies = new Cookies();
  cookies.set("test", "haha", {
    path: "/",
    secure: false,
    httpOnly: true,
  });

  const cookieValue = cookies.get("test");
  console.log("쿠키값");
  console.log(cookieValue);
  return (
    <div className="container mt-5">
      <ChatRoomList props={props} onePagePostNumber={9} />
      <MainSellerPageList props={props} />
    </div>
  );
}
