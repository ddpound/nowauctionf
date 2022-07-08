import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle";

import { useState, useEffect } from "react";

import CouponListPageNation from "./CouponListPageNaition";
import {
  resetTokens,
  retrunTokens,
  returnReToke,
  returnHeaderTokens,
} from "../../commonFuntions/TokenRelatedFunctions";

function couponDelete(id) {
  console.log(id);
  axios
    .delete("admin/delete-one-coupon/" + id, returnHeaderTokens)
    .then((res) => {
      resetTokens(res);
      console.log("삭제완료");
      document.location.reload();
    });
}

export default function CouponListComponent() {
  const [posts, setPosts] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    axios
      .get("/admin/find-all-coupon", returnHeaderTokens)
      .then((res) => {
        resetTokens(res);

        console.log(res);
        setPosts(res.data);
      })
      .catch(() => {
        console.log("쿠폰 목록을 가져올수 없습니다.");
      });
  }, []);
  return (
    <div className="container mt-5">
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <table>
          <thead>
            <tr>
              <th>쿠폰아이디</th>
              <th>쿠폰 코드</th>
              <th>유저 아이디</th>
              <th>유저 이름</th>
            </tr>
          </thead>
          <tbody>
            {posts
              .slice(offset, offset + limit)
              .map(({ id, couponCode, userId, userName }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{couponCode}</td>
                  <td>{userId}</td>
                  <td>{userName}</td>
                  <td>
                    <button
                      id={id}
                      className="btn btn-danger"
                      onClick={(e) => {
                        couponDelete(e.target.id);
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </label>
      <CouponListPageNation
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
