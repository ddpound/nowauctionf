export default function Index(props){
    
    const id = props.match.params.id
    
    return (
        <div>
            <h1>게시판 제목</h1>
            {id && <h3>게시판 ID : {id}</h3>}
            <p>대충 내용</p>
        </div>

    )
    
    
}