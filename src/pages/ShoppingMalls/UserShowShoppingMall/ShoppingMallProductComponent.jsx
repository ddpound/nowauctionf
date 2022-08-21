import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

// 썸네일 생각

export default function ShoppingMallProductComponent({
  name,
  seller,
  price,
  quantity,
  thumbnail,
}) {
  const slicepath = thumbnail.slice(0, -1);
  const splitThumnail = slicepath.split(",");

  return (
    !!name && (
      <div className="col">
        <div className="card shadow-sm">
          {/* 설명 썸네일 부분 */}
          <Carousel>
            {!!splitThumnail ? (
              splitThumnail.map((thumbnail) => {
                return (
                  <Carousel.Item key={thumbnail}>
                    <img
                      className="d-block w-100"
                      style={{
                        minWidth: "100%",
                        minHeight: "400px",
                        maxHeight: "400px",
                      }}
                      src={thumbnail}
                      alt="thumbnail"
                    />
                  </Carousel.Item>
                );
              })
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/thumbnail/jangThumnail.png"
                  alt="default"
                />
              </Carousel.Item>
            )}
          </Carousel>
          <Link to="/chat-room/1">
            {/* 설명 썸네일 부분 */}
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
