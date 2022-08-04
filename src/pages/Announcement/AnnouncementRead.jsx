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
    <div className="container-sm mt-5">
      {!!board.Content && (
        <div>
          <div className="card mb-3">
            <div className="card-header bg-transparent ">
              <h2 style={{ fontWeight: "bold" }}>{board.title}</h2>
            </div>
            <div className="card-body text-dark">
              <Viewer initialValue={board.Content}></Viewer>
            </div>
            <div className="card-footer bg-transparent">{board.createDate}</div>
          </div>
        </div>
      )}
    </div>
  );
}
