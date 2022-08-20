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
}) {
  // map으로 받아내야함
  return (
    !!name && (
      <div className="col">
        <div className="card shadow-sm">
          {/* 설명 썸네일 부분 */}
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/thumbnail/jangThumbnail.png"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/thumbnail/jangThumbnail.png"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/thumbnail/jangThumbnail.png"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
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
