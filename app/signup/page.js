import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="signup-frame">
      <div className="signup-main">
        <Link href="/">
          <div className="go-index">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </Link>
        <span className="signup">Sign Up</span>
        <form method="POST" action="/api/auth/signup">
          <span>이름</span>
          <input name="name" placeholder="이름" type="text" />
          <span>이메일</span>
          <input name="email" placeholder="이메일" type="text" />
          <span>비밀번호</span>
          <input name="password" placeholder="비밀번호" type="password" />
          <span>비밀번호 확인</span>
          <input name="checkpassword" placeholder="비밀번호 확인" type="password" />
          <div>
            <label>
              <input type="radio" name="root" value="1" checked />
              <span>소비자</span>
            </label>
            <label>
              <input type="radio" name="root" value="0" />
              <span>판매자</span>
            </label>
          </div>
          <button>회원가입</button>
        </form>
        <Link className="login-link" href="/login">
          로그인
        </Link>
      </div>
    </div>
  );
}
