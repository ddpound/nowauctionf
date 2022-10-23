import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ShoppingMallBlockComponent from "./ShppingMallBlockComponent";

import ListPageNation from "../../../components/PageNation/ListPageNation";
// 페이징 할 컴포넌트 위에 기초가 되는 애

// onePagePostNumber : 한페이지에 몇장

export default function ShoppingMallBlockComponentContainer({
  onePagePostNumber,
}) {
  const [shoppingMallList, setShoppingMallList] = useState([]);
  const [postingNumber, setPostingNumber] = useState(onePagePostNumber);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * postingNumber;

  useEffect(() => {
    // 무조건 딱 한번 리스트를 받아와서 페이징해줌
    const requestList = axios.get(
      "/auction-seller/auth/find-all-shopping-mall"
    );
    requestList.then((res) => {
      setShoppingMallList(res.data.reverse());
    });
  }, []);

  // 여기에 그냥 버튼 넣자 페이지 네이션 그게 나을듯
  // 최대한 심플하게

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {shoppingMallList.length > 0 &&
          shoppingMallList
            .slice(offset, offset + postingNumber)
            .map((posts) => {
              return (
                <ShoppingMallBlockComponent
                  title={posts.shoppingMallName}
                  text1={posts.shoppingMallExplanation}
                  src={posts.thumbnailUrlPath}
                  makedate={posts.createShoppinMall}
                  key={posts.id}
                  url={"/show-shoppingmall/" + posts.id}
                />
              );
            })}

        {shoppingMallList.length === 0 && (
          <div>
            <p className="h2">등록된 쇼핑몰이 없습니다.</p>
          </div>
        )}
      </div>
      {shoppingMallList.length > 0 && (
        <ListPageNation
          postLength={shoppingMallList.length}
          oneViewNumber={postingNumber}
          page={page}
          setPage={setPage}
          inMaxPageListNumber={10}
        />
      )}
    </div>
  );
}
