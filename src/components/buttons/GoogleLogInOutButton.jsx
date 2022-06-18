import "./GoogleLogoutButton.scss";
import cookies from "react-cookies";

// 여기다가 그냥 재랜더링 시키되
// 로그인시 로그아웃시 if문이 들어가 return 하는 값을 다르게 넣어주면 될듯

function googleTokenClear() {
  localStorage.removeItem("google-login-success");
  localStorage.removeItem("google-login-success-re");
  cookies.remove("login-check");
  document.location.href = "/";
  //localStorage.clear();
}

export default function LogInOut(props) {
  const test = false;

  if (localStorage.getItem("google-login-success") == null) {
    return (
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="/login-page">
          로그인하기
        </a>
      </li>
    );
  } else {
    if (props.type != null) {
      return (
        <li className="nav-item">
          <div>
            <button className={props.type} onClick={googleTokenClear}>
              로그아웃하기
            </button>
          </div>
        </li>
      );
    } else {
      return;
    }
  }
}
