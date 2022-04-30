import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";

export default function ChatRoom(props) {
  const id = props.match.params.id;

  return (
    <div class="container">
      <div class="row">
        <div class="col">방송화면div</div>
        <div class="col">
          <div class="row">
            <div class="col">현재 판매 물품 내용</div>
          </div>
          <div class="row">
            <div class="col">채팅창</div>
          </div>
        </div>
      </div>
    </div>
  );
}
