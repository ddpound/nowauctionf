import "bootstrap/dist/js/bootstrap.bundle";
//import "./ModalComponent.scss";

export default function ModalComponent() {
  return (
    <div className="modal" tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">삭제</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>삭제하실래요?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              아니요
            </button>
            <button type="button" className="btn btn-primary">
              네
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
