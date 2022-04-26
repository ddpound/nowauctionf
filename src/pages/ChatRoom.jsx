export default function ChatRoom(props){
    
    const id = props.match.params.id
    
    return (
        <div>
            <h1>채팅방 제목</h1>
            {id && <h3>채팅방 ID : {id}</h3>}
            <p>대충 내용</p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>

    )
    
    
}