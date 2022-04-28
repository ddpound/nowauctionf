import "./Footer.scss";
import "bootstrap/dist/js/bootstrap.bundle";

export default function Footer() {
  return (
    <div class="bd-footer container">
      <footer class="py-3 my-4 bg-white">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3 ">
          <li class="nav-item">
            <a href="/" class="nav-link px-2 text-muted">
              홈
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              라이센스
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              공지
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              문의하기
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <p class="text-center text-muted">© 2022 Company, Inc</p>
      </footer>
    </div>
  );
}
