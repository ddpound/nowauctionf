// 이런식의 css 임포트도 가능
import "./Header.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import GoogleLogoutButton from "../buttons/GoogleLogInOutButton";
import { useContext } from "react";
import ReduxContext from "../../context/ReduxContext";
import { connect } from "react-redux/es/exports";

function Header({ userdata }) {
  console.log("헤더동작확인");
  console.log(userdata);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <h2>장</h2>
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  공지
                </a>
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
                    {userdata.nickName != "" && userdata.nickName}
                    {userdata.nickName == "" && "공지"}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/user-info">
                        내정보
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/user-info">
                        구매내역
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <GoogleLogoutButton type="dropdown-item"></GoogleLogoutButton>
                  </ul>
                </li>
              )}
              <GoogleLogoutButton></GoogleLogoutButton>
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

// 인자로 들어옴
const StateToprops = (state) => {
  return {
    userdata: state,
  };
};

const DispatchtoPrps = (dispatch) => {
  return {};
};

const StoreInHeader = connect(StateToprops, DispatchtoPrps)(Header);

export default StoreInHeader;
