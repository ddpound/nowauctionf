import queryString from 'query-string'


export default function Qnaboardmain(props){
    const searchParams = props.location.search
    //console.log(searchParams)
    // 이 방법도 있다.
    //const obj = new URLSearchParams(searchParams)
    // 반드시 key 값을 알아야 value에 접근할 수 있습니다.
    // 그리고 브라우저 별로 지원하지않는 경우도 있다.
    //console.log(obj.get('startpage'))
    // 이러한 URLSearchParams 의 단점을 보완하기위해
    // npm i query-string 모듈을 설치한다
    // 그럼 위의 두가지 단점을 보완할수 있습니다.
    // query-string 
    const query = queryString.parse(searchParams)
    console.log(query)



    return(
    <div>
        <h1> QnA 게시판입니다.</h1>
        {query.startpage && <p>시작 페이지는 {query.startpage} 입니다.</p>}
            
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