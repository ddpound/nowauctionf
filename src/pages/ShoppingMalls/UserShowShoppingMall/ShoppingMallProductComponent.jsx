import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link } from "react-router-dom";

// 썸네일 생각

export default function ShoppingMallProductComponent({
  name,
  seller,
  price,
  quantity,
}) {
  return (
    !!name && (
      <div className="col">
        <div className="card shadow-sm">
          <Link to="/chat-room/1">
            <img
              src="thumbnail/jangThumbnail.png"
              className="card-img-top bd-placeholder-img"
              width="100%"
              height="225"
              alt=""
              style={{ objectFit: "fill" }}
            />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{seller}</p>
              <p className="card-text">{price}</p>
              <hr />
              <p className="card-text">재고</p>
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">{quantity}</small>
              </div>
            </div>
          </Link>
        </div>
      </div>
    )
  );
}
