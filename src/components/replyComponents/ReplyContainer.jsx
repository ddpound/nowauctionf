import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

/**
 * 1. get요청해서 댓글 리스트를 받아낼 url
 * 2. post요청해서 댓글 작성을 받아낼 url
 * 3. delete 요청해서 삭제할 url
 */

export default function ReplyContainer({ repleyGetUrl, replySavePostUrl }) {
  return <div className="container">댓글</div>;
}
