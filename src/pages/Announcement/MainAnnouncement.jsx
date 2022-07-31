import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardBlock from "./AnnouncementComponents/BoardBlock";

export default function MainAnnouncement() {
  const adminIn = localStorage.getItem("adminSuccess", "imadmin");
  return (
    <div className="container mt-5">
      <BoardBlock />
      <BoardBlock />

      {!!adminIn && (
        <Link className="btn btn-dark" to="/announcement-write">
          글쓰기
        </Link>
      )}
    </div>
  );
}
