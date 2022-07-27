// 이런식의 css 임포트도 가능
import "./Header.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import GoogleLogoutButton from "../buttons/GoogleLogInOutButton";
import { Link } from "react-router-dom";

// 여기서 로컬 정보 찾기
function checkUserName() {
  const userModel = JSON.parse(localStorage.getItem("userdata"));
  return userModel;
}

export default function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <h2>장</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/announcement-main"
                >
                  공지
                </Link>
              </li>

              {localStorage.getItem("google-login-success") != null && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {checkUserName() != null && checkUserName().nickName}
                    {checkUserName() == null && "공지"}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link className="dropdown-item" to="/user-info">
                        내정보
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/user-info">
                        구매내역
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <GoogleLogoutButton
                      histo={props}
                      type="dropdown-item"
                    ></GoogleLogoutButton>
                  </ul>
                </li>
              )}
              <GoogleLogoutButton histo={props}></GoogleLogoutButton>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-light" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
