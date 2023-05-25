"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const login = async (e) => {
    // 원래 실행되는 이벤트 취소
    e.preventDefault();
    // Form 안에서 이메일, 패스워드 가져오기
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await signIn("email-password-credential", {
      email,
      password,
      redirect: true,
      callbackUrl: "http://localhost:3000/",
    });
    console.log(response);
  };
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
        <form onSubmit={login}>
          <input name="email" placeholder="Email" type="email" />
          <input name="password" placeholder="Password" type="password" />
          <button type="submit">로그인</button>
        </form>
        <Link className="signup-link" href="/signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}
