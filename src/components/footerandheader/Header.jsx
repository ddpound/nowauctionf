// 이런식의 css 임포트도 가능

import "./Header.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import GoogleLogoutButton from "../buttons/GoogleLogInOutButton";
import { Link } from "react-router-dom";
import "../../custom/custom.scss";
import { useEffect, useState } from "react";
import {
  requestGetHaveToken,
  requestPostHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";
import { useHistory } from "react-router-dom";

import { returnDATA } from "../../commonFuntions/CommonEncryption";

const localUserDataName = process.env.REACT_APP_local_userdata_KEY;
const localadminDataName = process.env.REACT_APP_local_admin_success_KEY;
const localsellerDataName = process.env.REACT_APP_local_seller_success_KEY;

export default function Header(props) {
  const history = useHistory();
  const [locationKeys, setLocationKeys] = useState([]);

  const [userModel, setUserModel] = useState();

  useEffect(() => {
    setUserModel(returnDATA(localUserDataName));
  }, []);

  useEffect(() => {
    requestGetHaveToken("/auction-user/auth/check-cookie-token")
      .then((res) => {
        if (res.data !== 1) {
          localStorage.removeItem(localUserDataName);

          return setUserModel(returnDATA(localUserDataName));
        }
      })
      .catch((Error) => {
        localStorage.removeItem(localUserDataName);
        return setUserModel(returnDATA(localUserDataName));
      });

    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);

        setUserModel(returnDATA(localUserDataName));
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          setUserModel(returnDATA(localUserDataName));
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          setUserModel(returnDATA(localUserDataName));
        }
      }
    });
  }, [locationKeys, history]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/imgs/JangMain.png" alt="" />
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

              {localStorage.getItem("userdata") != null && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userModel != null && userModel.nickName}
                    {userModel == null && "공지"}
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
                      <Link className="dropdown-item" to="/user-purchase">
                        구매내역
                      </Link>
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
              <button className="btn btn-outline-dark" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
