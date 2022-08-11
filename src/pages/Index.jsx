import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";
import MainSellerPageList from "../components/MainSellerPageList/MainSellerPageList";

import ChatRoomList from "./ChatRoomShowList/Components/ChatRoomList";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

// 글이 없을때는 열린 장이 없습니다.

export default function Index(props) {
  return (
    <div className="container mt-5">
      <ChatRoomList props={props} onePagePostNumber={9} />
      <MainSellerPageList props={props} />
    </div>
  );
}
