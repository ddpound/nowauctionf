import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";
import MainSellerPageList from "../components/MainSellerPageList/MainSellerPageList";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

// 글이 없을때는 열린 장이 없습니다.

export default function Index() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <Link to="/chat-room/1">
            <div
              className="card"
              style={{ width: "18rem", margin: "18px auto" }}
            >
              <img
                src="thumbnail/jangThumbnail.png"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">방제</h5>
                <p className="card-text">방장</p>
                <hr />
                <p className="card-text">시청자수</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/chat-room/1">
            <div
              className="card"
              style={{ width: "18rem", margin: "18px auto" }}
            >
              <img
                src="thumbnail/jangThumbnail.png"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">방제</h5>
                <p className="card-text">방장</p>
                <hr />
                <p className="card-text">시청자수</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/chat-room/1">
            <div
              className="card"
              style={{ width: "18rem", margin: "18px auto" }}
            >
              <img
                src="thumbnail/jangThumbnail.png"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">방제</h5>
                <p className="card-text">방장</p>
                <hr />
                <p className="card-text">시청자수</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to="/chat-room/1">
            <div
              className="card"
              style={{ width: "18rem", margin: "18px auto" }}
            >
              <img
                src="thumbnail/jangThumbnail.png"
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5 className="card-title">방제</h5>
                <p className="card-text">방장</p>
                <hr />
                <p className="card-text">시청자수</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <MainSellerPageList />
    </div>
  );
}
