// 이런식의 css 임포트도 가능
import './Header.css'

export default function Header(){
    
    return (
    <header>
        <section>nowAuction</section>
        <section>문의하기</section>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    
                </div>
    </header>
    
    )
    
}