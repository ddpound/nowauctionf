import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

// 쇼핑몰 아이디를 받아내서 만들어내자

export default function ShoppingMallExplanation({ shoppingmall }) {
  console.log(shoppingmall);
  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-4">
          <img
            className="img-fluid border border-dark"
            src={shoppingmall.thumbnailUrlPath}
            alt="thumbnail"
          />
        </div>
        <div className="col-6">
          <span className="input-group-text" id="inputGroup-sizing-default">
            쇼핑몰이름
          </span>
          <p className="h2 ms-4 mt-3">{shoppingmall.shoppingMallName}</p>
          <span className="input-group-text" id="inputGroup-sizing-default">
            설명
          </span>
          <p className="h2 ms-4 mt-3">{shoppingmall.shoppingMallExplanation}</p>

          <input type="hidden" className="form-control" id="inputGroupFile02" />
        </div>
      </div>
    </div>
  );
}
