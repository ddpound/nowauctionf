import axios from "axios";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import { Link, Prompt } from "react-router-dom";
import ModalCommonsComponent from "../../../components/ModalCommonsComponent";

import {
  requestGetHaveToken,
  requestPostHaveToken,
} from "../../../commonFuntions/requestHaveToken";

import SunEditorSellerWriteComponent from "../../../components/SunEditor/SunEditorSellerWriteComponent";

// Page jsx입니다.

export default function PageShoppingMallWrite(props) {
  const [isLeave, setIsLeave] = useState(false);
  const [show, setShow] = useState(false);
  const [nextLocation, setNextLocation] = useState("");

  const [successProduct, setSuccessProduct] = useState(false);

  const [shouldConfirm, setShouldConfirm] = useState(true);

  // 여기에 axios를 담으면 될듯
  const deleteRequest = () => {
    requestGetHaveToken("/seller/delete-temporary-iamge").catch((Error) => {
      console.log(Error);
    });
  };

  // 수정부분이 될것임
  const initialContent = "글작성 해주세요 사진 첨부는 최대 세장입니다.";

  const onSubmit = (content, files, title, productprice, productquantity) => {
    const formData = new FormData();

    if (!!files) {
      formData.append("title", title);
      formData.append("content", content);
      formData.append("thumbnail1", files[0]);

      const rqPhT = requestPostHaveToken("/seller/save-board", props, formData);

      rqPhT
        .then(() => {
          setShow(false);
          setShouldConfirm(false);
          setSuccessProduct(true);
        })
        .catch((Error) => {
          console.log(Error);
        });

      // 여기서 세이브 진행하면 될듯
    } else {
      alert("제품의 썸네일 사진은 필수입니다!");
    }
  };
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

      return props.history.push(nextLocation);
    }
  }, [isLeave, props.history]);

  // 제품등록시 늦는 render 때문에 useEffect를 하나 더둠
  // 반드시 필요함 , 오늘이나 내일 모듈화 예정
  useEffect(() => {
    if (successProduct) {
      setShouldConfirm(false);

      alert("글 작성에 성공하셨습니다.");
      return props.history.push("/");
    }
  }, [successProduct]);

  return (
    <>
      <SunEditorSellerWriteComponent
        initialContent={initialContent}
        onSubmit={onSubmit}
        title="글작성"
      />
      <div className="container"></div>
      <Prompt when={shouldConfirm} message={handlePrompt} />
      <ModalCommonsComponent
        modalHeading={"나가기"}
        question={"작성내용이 없어집니다. 그래도 나가시겠습니까?"}
        yespart={"네"}
        nopart={"아니요"}
        show={show}
        setShow={setShow}
        yesfunction={deleteRequest}
        setIsLeave={setIsLeave}
      />
    </>
  );
}
