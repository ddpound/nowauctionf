export default function Qnaboardmain(props){


    const searchParams = props.location.search

    console.log(searchParams)

    const obj = new URLSearchParams(searchParams)

    // 반드시 key 값을 알아야 value에 접근할 수 있습니다.
    
    console.log(obj.get('startpage'))

    return(
    <div>
        <h1> QnA 게시판입니다.</h1>
            
            <table border= "1" >
                <thead>
                    <tr>
                        <th>게시판 No.</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>카테고리</th>
                        <th>작성날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>테스트1</td>
                        <td>관리자</td>
                        <td>공지글</td>
                        <td>2022.04.02</td>
                    </tr>
                    <tr>
                    <td>1</td>
                        <td>테스트2</td>
                        <td>관리자</td>
                        <td>공지글</td>
                        <td>2022.04.02</td>
                    </tr>
                    <tr>
                    <td>1</td>
                        <td>테스트3</td>
                        <td>관리자</td>
                        <td>공지글</td>
                        <td>2022.04.02</td>
                    </tr>
                </tbody>
            </table>
    </div>
    ) 
    
}