import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";

import NowShoppingMallList from "../../pages/ShoppingMalls/components/NowShoppingMallList";

export default function MainSellerPageList({ props }) {
  return (
    <div className="container">
      판매 사이트 리스트
      <NowShoppingMallList props={props} />
    </div>
  );
}
