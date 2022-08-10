import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ShoppingMallBlockComponent({
  title,
  text1,
  text2,
  url,
  src,
  makedate,
}) {
  //src 가 빈값일 때는 기본 썸네일로 변경
  !src && (src = "thumbnail/jangThumbnail.png");

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to={url}>
          <img
            src={src}
            className="card-img-top bd-placeholder-img"
            width="100%"
            height="225"
            alt=""
            style={{ objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text1}</p>
            <hr />
            <p className="card-text">{text2}</p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">{makedate}</small>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
