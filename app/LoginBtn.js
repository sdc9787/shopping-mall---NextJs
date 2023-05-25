"use client";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      className="navber-login"
      onClick={() => {
        signIn();
      }}
    >
      <span>로그인</span>
    </button>
  );
}
