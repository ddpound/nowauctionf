import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BoardBlock from "./AnnouncementComponents/BoardBlock";
import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

import { Viewer } from "@toast-ui/react-editor";

export default function AnnouncementRead(props) {
  const boardid = props.match.params.id;

  const [board, setboard] = useState({});

  useEffect(() => {
    axios.get("/find-announcement-board/" + boardid).then((res) => {
      setboard(res.data.value);
    });
  }, []);
  return (
    <div className="container mt-5">
      {board.Content !== "" && <Viewer initialValue={board.Content} />}
    </div>
  );
}
