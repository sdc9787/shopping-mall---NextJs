import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Login() {
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
          <span>ID</span>
          <input name="name" placeholder="ID" type="text" />
          <span>Password</span>
          <input name="password" placeholder="PASSWORD" type="password" />
          <span>Check Password</span>
          <input name="checkpassword" placeholder="CHECK PASSWORD" type="password" />
          <div className="radio-input">
            <input id="a" type="radio" name="c" value="1" checked />
            <label htmlFor="a">소비자</label>
            <input id="b" type="radio" name="c" value="2" />
            <label htmlFor="b">판매자</label>
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
