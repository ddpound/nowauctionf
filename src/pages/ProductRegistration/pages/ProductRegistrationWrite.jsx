import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

// import SunEditor, { buttonList } from "suneditor-react";

import ModalCommonsComponent from "../../../components/ModalCommonsComponent";

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// 썸네일 사진 최대3장
// 글 작성 사진 최대 10장

import {
  requestPostHaveToken,
  requestGetHaveToken,
} from "../../../commonFuntions/requestHaveToken";

import SunEditorComponent from "../../../components/SunEditor/SunEditorComponent";

/**
 * Page입니다.
 * 수정, 저장 모두 여기서 진행합니다.
 *
 */
export default function ProductRegistrationWrite({
  history,
  props,
  InModify,
  product,
}) {
  const [isLeave, setIsLeave] = useState(false);
  const [show, setShow] = useState(false);
  const [nextLocation, setNextLocation] = useState("");

  const [successProduct, setSuccessProduct] = useState(false);

  const [shouldConfirm, setShouldConfirm] = useState(true);

  const [modifyProduct, setModifyProduct] = useState(product);

  /**
   * 기본은 false
   * true 일때 수정이 진행됩니다.
   */
  const [modify, setModify] = useState(InModify);

  // 여기에 axios를 담으면 될듯
  const deleteRequest = () => {
    requestGetHaveToken("/seller/delete-temporary-iamge").catch((Error) => {
      console.log(Error);
    });
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

      return history.push(nextLocation);
    }
  }, [isLeave, history]);

  // 제품등록시 늦는 render 때문에 useEffect를 하나 더둠
  // 반드시 필요함 , 오늘이나 내일 모듈화 예정
  useEffect(() => {
    if (successProduct) {
      setShouldConfirm(false);

      // 즉 modify가 참이라면 수정이니
      if (modify) {
        alert("수정에 성공하셨습니다");
      } else {
        alert("제품등록에 성공하셨습니다.");
      }

      return history.push("/");
    }
  }, [successProduct]);

  // 수정부분이 될것임

  let initialContent = "제품 설명을 작성해주세요 사진은 최대 10장입니다.";

  const onSubmit = (
    content,
    files,
    productname,
    productprice,
    productquantity,
    productId
  ) => {
    const formData = new FormData();

    let requestUrl = "/seller/save-product/false";
    if (InModify) {
      requestUrl = "/seller/save-product/true";

      // 꼭 ID도 넣어줘야함
      formData.append("ProductID", productId);
    }

    // 공통적인것은 지금 담아
    formData.append("productname", productname);
    formData.append("productprice", productprice);
    formData.append("productquantity", productquantity);
    formData.append("content", content);

    if (!!files) {
      formData.append("thumbnail1", files[0]);
      formData.append("thumbnail2", files[1]);
      formData.append("thumbnail3", files[2]);
    }

    // 수정이 아닐때는 false니깐 역을줘서 true
    if (files.length == 0 && !modify) {
      alert("처음 입력할때는 썸네일이 있어야합니다.");
    } else {
      requestPostHaveToken(requestUrl, props, formData)
        .then(() => {
          setShow(false);
          setShouldConfirm(false);
          setSuccessProduct(true);
          setModify(InModify);
        })
        .catch((Error) => {
          console.log(Error);
        });

      // 여기서 세이브 진행하면 될듯
    }
  };

  return (
    <>
      <div className="App">
        <SunEditorComponent
          initialContent={initialContent}
          onSubmit={onSubmit}
          title="제품등록"
          modifyProduct={product}
        />
      </div>
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
