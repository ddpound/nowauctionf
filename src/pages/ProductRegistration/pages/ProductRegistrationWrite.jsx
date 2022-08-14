import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

import SunEditor, { buttonList } from "suneditor-react";

import ModalCommonsComponent from "../../../components/ModalCommonsComponent";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// 썸네일 사진 최대3장
// 글 작성 사진 최대 10장

import { requestPostHaveToken } from "../../../commonFuntions/requestHaveToken";

import SunEditorComponent from "../../../components/SunEditor/SunEditorComponent";

// Page입니다.
export default function ProductRegistrationWrite(props) {
  const [isLeave, setIsLeave] = useState(false);
  const [show, setShow] = useState(false);
  const [nextLocation, setNextLocation] = useState("");

  const [shouldConfirm, setShouldConfirm] = useState(true);

  // 여기에 axios를 담으면 될듯
  const deleteRequest = () => {};

  const handlePrompt = (location) => {
    setShow(true);

    if (!isLeave && shouldConfirm) {
      setNextLocation(location.pathname);

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (isLeave) {
      setShouldConfirm(false);
      console.log("작도오오옹");
      return props.history.push(nextLocation);
    }
  }, [isLeave, props.history]);

  const initialContent = "제품 설명을 작성해주세요 사진은 최대 10장입니다.";
  const onSubmit = (
    content,
    files,
    productname,
    productprice,
    productquantity
  ) => {
    const formData = new FormData();

    console.log("Submitted Content", productname);
    console.log("Submitted Content", productprice);
    console.log("Submitted Content", files);
    console.log("Submitted Content", content);

    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productquantity", productquantity);
    formData.append("content", content);
    formData.append("thumbnail1", files[0]);
    formData.append("thumbnail2", files[1]);
    formData.append("thumbnail3", files[2]);

    const rqPhT = requestPostHaveToken("/seller/save-product", props, formData);

    rqPhT
      .then(() => {
        show(false);
        props.history.push("/");
        alert("제품등록에 성공하셨습니다.");
      })
      .catch((Error) => {
        console.log(Error);
      });

    // 여기서 세이브 진행하면 될듯
  };

  return (
    <>
      <div className="App">
        <SunEditorComponent
          initialContent={initialContent}
          onSubmit={onSubmit}
          title="제품등록"
        />
      </div>
      <Prompt when={shouldConfirm} message={handlePrompt} />
      <ModalCommonsComponent
        modalHeading={"나가기"}
        question={
          "나가시면 작성했던 내용이 전부 날라갑니다. 그래도 나가시겠습니까?"
        }
        yespart={"네"}
        nopart={"아니요"}
        show={show}
        setShow={setShow}
        setIsLeave={setIsLeave}
      />
    </>
  );
}
