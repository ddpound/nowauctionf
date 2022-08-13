import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import SunEditorComponent from "./SunEditorComponent";

export default function ExampleSunEditorUse() {
  const initialContent = "Hello World";
  const onSubmit = (content, files, productname, productprice) => {
    console.log("Submitted Content", productname);
    console.log("Submitted Content", productprice);

    console.log("Submitted Content", files);

    console.log("Submitted Content", content);
  };

  return (
    <div className="App">
      <SunEditorComponent
        initialContent={initialContent}
        onSubmit={onSubmit}
        title="Edit Text"
      />
    </div>
  );
}
