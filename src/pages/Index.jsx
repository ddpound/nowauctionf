import "bootstrap/dist/js/bootstrap.bundle";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

// 글이 없을때는 열린 장이 없습니다.

export default function Index() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10">
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">방번호</th>
                  <th scope="col">방제목</th>
                  <th scope="col">방장</th>
                  <th scope="col">시청자 수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    <a href="/chat-room/1">1번방으로오세요</a>
                  </td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>테스트 방송</td>
                  <td>admin</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-sm-2 position-relative">
          <div className="row position-absolute bottom-0 end-0">
            <button type="button" className="btn btn-outline-dark">
              방만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
