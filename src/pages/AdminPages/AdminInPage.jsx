import "bootstrap/dist/js/bootstrap.bundle";
import "./AdminInPage.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  resetTokens,
  returnHeaderTokens,
} from "../../commonFuntions/TokenRelatedFunctions";

const login_key = process.env.REACT_APP_admin_page_login_key;

function adminGet(inputValue, props) {
  axios
    .post(
      "/give-admin",
      { password: inputValue },
      {
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("google-login-success"),
          Refreshtoken:
            "Bearer " + localStorage.getItem("google-login-success-re"),
        },
      }
    )
    .then((responese) => {
      resetTokens(responese);
      // 여기서 값을받아서 또 관리자 local값을 저장해주자
      console.log(responese);

      localStorage.setItem("adminSuccess", "imadmin");

      alert("권한을 받아오는데 성공했습니다!");
      props.history.push("/");
    })
    .catch((e) => {
      console.log(e);
    });
}

export default function AdminInPage(props) {
  const password = props.match.params.password;

  if (password === login_key) {
    return (
      <div className="container mt-5">
        <form className="row g-3">
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              placeholder="Password"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={() => {
                const valueInput =
                  document.getElementById("inputPassword2").value;
                adminGet(valueInput, props);
              }}
              className="btn btn-primary mb-3"
            >
              권한 받기
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <>
        {alert("비밀번호가 틀렸습니다.")}
        {props.history.push("/")}
      </>
    );
  }
}
