import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Login() {
  return (
    <div className="login-frame">
      <div className="login-main">
        <Link href="/">
          <div className="go-index">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
        </Link>
        <span className="Login-title">THESINSA</span>
        <span className="login">Login</span>
        <form>
          <input placeholder="ID" type="text" />
          <input placeholder="PASSWORD" type="password" />
          <button>로그인</button>
        </form>
        <Link className="signup-link" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
