import "bootstrap/dist/js/bootstrap.bundle";
import "./AdminInPage.scss";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  resetTokens,
  returnHeaderTokens,
} from "../../commonFuntions/TokenRelatedFunctions";

import { requestPostHaveToken } from "../../commonFuntions/requestHaveToken";

const login_key = process.env.REACT_APP_admin_page_login_key;

function adminGet(inputValue, props) {
  requestPostHaveToken("/auction-user/give-admin", props, {
    password: inputValue,
  }).then((responese) => {
    localStorage.setItem("adminSuccess", "imadmin");

    alert("권한을 받아오는데 성공했습니다!");
    props.history.push("/");
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
