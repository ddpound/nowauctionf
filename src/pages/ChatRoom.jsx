import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";

export default function ChatRoom(props) {
  const id = props.match.params.id;

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm vh-100 min-vh-60">방송화면div</div>
        <div class="col-sm">
          <div class="row h-50">
            <div class="row-sm">현재 판매 물품 내용</div>
            <div class="row-sm">컨트롤러가 있는 div 버튼들 포함</div>
          </div>
          <div class="row h-50">
            <div class="col-sm">채팅창</div>
          </div>
        </div>
      </div>
    </div>
  );
}
