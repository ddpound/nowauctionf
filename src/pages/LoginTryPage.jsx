import "./LoginTryPage.scss";
import "bootstrap/dist/js/bootstrap.bundle";

function googleLoginTryButton(e) {
  e.preventDefault();
  console.log("구글 로그인 시도");
}

export default function LoginTryPage() {
  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header">구글로 로그인</div>
        <div className="card-body">
          <h5 className="card-title">회원가입이 필요 없습니다!</h5>
          <p className="card-text">
            사용하시던 유튜브, 구글 아이디를 이용해서 편리하게 사이트를
            이용하세요!
          </p>
          <button type="button" onClick={googleLoginTryButton} className="btn">
            <img src="./buttonimg/googleLogin.png" alt="" />
          </button>
        </div>
        <div className="card-footer text-muted">google login</div>
      </div>
    </div>
  );
}
