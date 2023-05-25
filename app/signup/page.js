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
          <span>name</span>
          <input name="name" placeholder="name" type="text" />
          <span>email</span>
          <input name="email" placeholder="email" type="text" />
          <span>Password</span>
          <input name="password" placeholder="PASSWORD" type="password" />
          <span>Check Password</span>
          <input name="checkpassword" placeholder="CHECK PASSWORD" type="password" />
          <button>회원가입</button>
        </form>
        <Link className="login-link" href="/login">
          로그인
        </Link>
      </div>
    </div>
  );
}
