import "bootstrap/dist/js/bootstrap.bundle";

// 백엔드 쪽에 요청한다. 보드 리스트를 axios 사용예정
function requestBoardList() {
  return null;
}

export default function Index() {
  return (
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
            <a href="/">Mark</a>
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
  );
}
