import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";
import MainSellerPageList from "../components/MainSellerPageList/MainSellerPageList";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

// 글이 없을때는 열린 장이 없습니다.

export default function Index(props) {
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div className="col">
          <div className="card shadow-sm">
            <Link to="/chat-room/1">
              <img
                src="thumbnail/jangThumbnail.png"
                className="card-img-top bd-placeholder-img"
                width="100%"
                height="225"
                alt=""
                style={{ objectFit: "fill" }}
              />

              <div className="card-body">
                <h5 className="card-title">방제</h5>
                <p className="card-text">방장</p>
                <hr />
                <p className="card-text">시청자수</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <MainSellerPageList props={props} />
    </div>
  );
}
