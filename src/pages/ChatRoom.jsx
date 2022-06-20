import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";

export default function ChatRoom(props) {
  const id = props.match.params.id;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm vh-100 min-vh-60">방송화면div</div>
        <div className="col-sm">
          <div className="row h-50">
            <div className="row-sm">현재 판매 물품 내용</div>
            <div className="row-sm">컨트롤러가 있는 div 버튼들 포함</div>
          </div>
          <div className="row h-50">
            <div className="col-sm">채팅창</div>
          </div>
        </div>
      </div>
    </div>
  );
}
