import "bootstrap/dist/js/bootstrap.bundle";
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
          <td>Mark</td>
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
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
}
