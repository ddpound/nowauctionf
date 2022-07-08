import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";

import CouponComponent from "../../components/CouponComponents/CouponComponent";

export default function MainAdminPage() {
  return (
    <div className="container mt-5">
      <div>
        <p>환영합니다 관리자님</p>

        <a href="/coupon-page" className="btn btn-dark">
          쿠폰관리 페이지
        </a>
      </div>
      <CouponComponent />
    </div>
  );
}
