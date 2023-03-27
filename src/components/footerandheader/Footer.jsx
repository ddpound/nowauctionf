import "./Footer.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bd-footer container-fluid">
      <footer className="py-3 my-4 bg-white">
        <ul className="nav justify-content-center border-top pb-2 ">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
              홈
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              라이센스
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              공지
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              문의하기
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <ul className="nav justify-content-center pb-2 ">
          <li className="nav-item">
            <a
              className="nav-link px-2 text-muted"
              href="https://www.flaticon.com/kr/free-icons/"
              title=" 아이콘"
            >
              아이콘 제작자: uicon - Flaticon
            </a>
          </li>
        </ul>
        <p className="text-center border-bottom text-muted">
          © 2022 Company, Inc
        </p>
      </footer>
    </div>
  );
}
