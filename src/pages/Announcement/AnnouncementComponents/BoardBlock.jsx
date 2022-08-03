import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "./BoardBlockScss.scss";
import { Link } from "react-router-dom";

// 게시판을 받아와서 표현하는 블럭들
export default function BoardBlock(announcement) {
  return (
    <Link
      to={"/announcement/" + announcement.announcement.id}
      style={{ textDecoration: "none" }}
    >
      <div className="card text-white bg-dark mb-3">
        <div className="card-header">
          <h5 className="card-title">{announcement.announcement.title}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">
            현재 공지글에 대한 미리보기입니다. 앞서 받은 글 길이의 100글자만
            가져와도 될듯
          </p>
        </div>
        <div className="card-footer">
          {announcement.announcement.createDate}
        </div>
      </div>
    </Link>
  );
}
