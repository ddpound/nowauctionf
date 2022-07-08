import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

export default function NewMakeShoppingMall() {
  return (
    <div className="container mt-5">
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">
          쇼핑몰이름
        </span>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>

      <div class="input-group mb-3">
        <label class="input-group-text" for="inputGroupFile01">
          썸네일
        </label>
        <input type="file" class="form-control" id="inputGroupFile01" />
      </div>
      <p>
        썸네일이 없으시면 기본 썸네일로 자동선택되며 나중에 수정하실수 있습니다.
      </p>
    </div>
  );
}
