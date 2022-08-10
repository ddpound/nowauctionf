import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BlockComponent from "./BlockComponent";

// 페이징 할 컴포넌트 위에 기초가 되는 애

// onePagePostNumber : 한페이지에 몇장

export default function BlockComponentContainer({
  onePagePostNumber,
  inPosts,
}) {
  const [posts, setPosts] = useState([]);

  const [postingNumber, setPostingNumber] = useState(onePagePostNumber);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * postingNumber;

  useEffect(() => {
    // 무조건 딱 한번 리스트를 받아와서 페이징해줌
    setPosts(inPosts);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <BlockComponent />
      </div>
    </div>
  );
}
