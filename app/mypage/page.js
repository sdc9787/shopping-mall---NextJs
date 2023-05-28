import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LogOutBtn } from "../LogOutBtn";
import LoginBtn from "../LoginBtn";
import { connectDB } from "@/util/database";

export default async function Create() {
  let session = await getServerSession(authOptions);
  return (
    <div>
      <div className="navbar">
        <div className="navbar-table">
          {session ? (
            <Link className="navbar-title" href="/">
              THESINSA
            </Link>
          ) : (
            <Link className="navbar-title" href="/">
              THESINSA
            </Link>
          )}

          {session ? (
            <Link className="navbar-a" href="/mypage">
              마이페이지
            </Link>
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              마이페이지
            </Link>
          )}

          {session ? (
            session.user.root == 1 ? (
              <Link className="navbar-a" href="/basket">
                장바구니
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              장바구니
            </Link>
          )}

          {session ? (
            session.user.root == 0 ? (
              <Link className="navbar-a" href="/pm">
                상품관리
              </Link>
            ) : (
              <div></div>
            )
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              상품관리
            </Link>
          )}
        </div>

        <div className="navber-login-sginup-search">
          {session ? (
            <span className="session-login">
              <span>{session.user.name}님</span> <LogOutBtn />
            </span>
          ) : (
            <LoginBtn></LoginBtn>
          )}
          {session ? <span></span> : <Link href={"/signup"}>회원가입</Link>}

          <form className="search-item" action="/api/search" method="POST">
            <input className="search" name="search" placeholder="검색" type="search" />
          </form>
        </div>
      </div>

      <h4 className="create-title">메인페이지</h4>
      <div className="create-frame">
        <form className="create-form" action="/api/mypage" method="POST">
          <span style={{ fontWeight: "700" }}>현재 비밀번호</span>
          <input name="password" type="password" />
          <span style={{ fontWeight: "700" }}>변경할 비밀번호</span>
          <input name="newpassword" type="password" />
          <input style={{ display: "none" }} name="session" type="text" value={session.user.password} />
          <input style={{ display: "none" }} name="id" type="text" value={session.user.email} />

          <button type="submit">비밀번호 변경</button>
        </form>
      </div>
    </div>
  );
}
