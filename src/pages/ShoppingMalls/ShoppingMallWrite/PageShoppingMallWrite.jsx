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
// 판매자가 글을 작성하는 곳 입니다.

export default function PageShoppingMallWrite({ history, board }) {
  const [isLeave, setIsLeave] = useState(false);
  const [show, setShow] = useState(false);
  const [nextLocation, setNextLocation] = useState("");

  const [successProduct, setSuccessProduct] = useState(false);

  const [shouldConfirm, setShouldConfirm] = useState(true);

  /**
   * 글이 들어왔다면 수정이라는 뜻이니 수정에 넣어준다
   */
  const [modifyBoard, setModifyBoard] = useState(board);

  // 카테고리를 가져올 리스트
  const [categoryList, setCategoryList] = useState([]);

  // 이게 참일때 리스트 요청을 한번 더해준다
  const [categoryListCheck, setCategoryListCheck] = useState(false);

  // 여기에 axios를 담으면 될듯
  const deleteRequest = () => {
    requestGetHaveToken("/auction-seller/seller/delete-temporary-iamge").catch(
      (Error) => {
        console.log(Error);
      }
    );
  };

  const onSubmit = (content, files, title, category) => {
    const formData = new FormData();

    let url = "/auction-seller/seller/save-board/false";

    if (!!modifyBoard) {
      url = "/auction-seller/seller/save-board/true";
    }

    //수정이 아니면서 파일이 없다면 썸네일이 반드시 필요
    // 흠 글작성할때는 필요없을듯
    if (!modifyBoard && !files) {
      alert("처음 글작성 할때 썸네일은 필수입니다!");
    } else {
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("thumbnail", files[0]);

      if (!!modifyBoard) {
        formData.append("boardId", modifyBoard.id);
      }

      const rqPhT = requestPostHaveToken(url, null, formData);

      rqPhT
        .then(() => {
          setShow(false);
          setShouldConfirm(false);
          setSuccessProduct(true);
        })
        .catch((Error) => {
          console.log(Error);
        });
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

  // 카테고리 값 가져오는 부분
  // 체크 부분이 참일 때 실행,
  useEffect(() => {
    requestGetHaveToken("/auction-seller/seller/get-category-list")
      .then((res) => {
        console.log(res);
        setCategoryList(res.data);
        setCategoryListCheck(false);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [categoryListCheck]);

  // 카테고리 값 가져오는 부분
  useEffect(() => {
    requestGetHaveToken("/auction-seller/seller/get-category-list")
      .then((res) => {
        console.log(res);
        setCategoryList(res.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, []);

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

      if (!!modifyBoard) {
        alert("수정에에 성공하셨습니다.");
      } else {
        alert("글 작성에 성공하셨습니다.");
      }

      return history.push("/");
    }
  }, [successProduct]);

  return (
    <>
      <SunEditorSellerWriteComponent
        board={modifyBoard}
        onSubmit={onSubmit}
        title="글작성"
        categoryList={categoryList}
        setCategoryListCheck={setCategoryListCheck}
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
