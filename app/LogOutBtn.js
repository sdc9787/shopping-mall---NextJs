"use client";
import { signOut } from "next-auth/react";

export function LogOutBtn() {
  return (
    <button
      className="navber-login"
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
