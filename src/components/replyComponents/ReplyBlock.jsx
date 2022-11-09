import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

const ReplyBlock = ({ reply }) => {
  return (
    <div className="container mt-2" key={reply.id}>
      <div className="card border-dark mt-1">
        <div className="card-header bg-transparent border-dark">
          <img
            className="rounded-circle w-25"
            src={reply.userPicture}
            style={{ maxWidth: "30px" }}
            alt=""
          />
          <label className="ms-3">{reply.nickName}</label>
        </div>
        <div className="card-body text-dark">
          <p className="card-text">{reply.content}</p>
        </div>
        <div className="card-footer bg-transparent border-dark">
          <label className="text-end lh-1 mt-1">
            작성 : {reply.createDate} 수정 : {reply.modifyDate}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ReplyBlock;
