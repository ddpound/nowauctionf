import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

/**
 * 판매자의 글을 리스트 받아오는 페이지
 *
 */
export default function SellerBoardBlockComponent({
  boardId,
  boardTitle,
  seller,
  category,
  makedate,
  thumbnail,
}) {
  let url = "/show-seller-board/" + boardId;

  return (
    <div className="container mt-5">
      {!!boardTitle && (
        <div className="col">
          <div className="card shadow-sm">
            <Link to={url}>
              <img
                src={thumbnail}
                className="card-img-top bd-placeholder-img"
                width="100%"
                height="225"
                alt=""
                style={{ objectFit: "fill" }}
              />
              <div className="card-body">
                <h5 className="card-title">{boardTitle}</h5>
                <p className="card-text">{seller}</p>
                <hr />
                <p className="card-text">{category}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">{makedate}</small>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
