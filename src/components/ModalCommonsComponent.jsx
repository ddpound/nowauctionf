import "bootstrap/dist/js/bootstrap.bundle";
//import "./ModalComponent.scss";

import React, { useState } from "react";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

// true 일때 보여짐
export default function ModalCommonsComponent({
  modalHeading,
  question,
  yespart,
  nopart,
  show, // 사용할 show는 밖에 둬야함 state로
  setShow,
  yesfunction, // yes눌렀을때 실행될 함수를 넣어주자
  setIsLeave, // isleave가 참일 때 밖으로 나가진다
}) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 네 를 눌렀을 때
  const yesPart = () => {
    setShow(false);
    setIsLeave(true);
    yesfunction();
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{question}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {nopart}
          </Button>
          <Button variant="primary" onClick={yesPart}>
            {yespart}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
