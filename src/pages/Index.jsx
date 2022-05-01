import "bootstrap/dist/js/bootstrap.bundle";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

export default function Index() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <div class="row">
            <table class="table">
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
          <div class="row">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    2
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    3
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-sm-2 position-relative">
          <div class="row position-absolute bottom-0 end-0">
            <button type="button" class="btn btn-success">
              방만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
