import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";

function makeCouponRequest() {
  axios
    .get("/admin/info", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("google-login-success"),
        Refreshtoken:
          "Bearer " + localStorage.getItem("google-login-success-re"),
      },
    })
    .then((response) => {
      console.log(response);
    });
}

export default function MainAdminPage() {
  return (
    <div className="container">
      <div>
        <p>관리자</p>
        <button
          onClick={() => {
            makeCouponRequest();
          }}
          className="button btn-primary"
        >
          쿠폰생성
        </button>
      </div>
    </div>
  );
}
