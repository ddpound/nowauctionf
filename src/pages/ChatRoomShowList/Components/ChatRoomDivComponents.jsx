import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link } from "react-router-dom";

export default function ChatRoomDivComponents({ title, host, thumbnail }) {
  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/chat-room/1">
          <img
            src={thumbnail}
            className="card-img-top bd-placeholder-img"
            width="100%"
            height="225"
            alt=""
            style={{ objectFit: "fill" }}
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{host}</p>
            <hr />
            <p className="card-text">시청자수</p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">9 mins</small>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
