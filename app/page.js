import { connectDB } from "@/util/database";
import Link from "next/link";
import PmList from "./PmList";
import LoginBtn from "./LoginBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { LogOutBtn } from "./LogOutBtn";

export default async function Home() {
  const db = (await connectDB).db("product"); //데이터 베이스 접근
  let result = await db.collection("info").find().toArray();
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });

  let session = await getServerSession(authOptions);

  return (
    <main>
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
            <Link className="navbar-a" href="/basket">
              장바구니
            </Link>
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              장바구니
            </Link>
          )}

          {session ? (
            <Link className="navbar-a" href="/pm">
              상품관리
            </Link>
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              상품관리
            </Link>
          )}
        </div>

        <div className="navber-login-sginup-search">
          {session ? (
            <span className="session-login">
              <span>{session.user.name}님</span> <LogOutBtn />{" "}
            </span>
          ) : (
            <LoginBtn></LoginBtn>
          )}
          {session ? <span></span> : <Link href={"/signup"}>회원가입</Link>}

          <form>
            <input className="search" placeholder="검색" type="search" />
          </form>
        </div>
      </div>

      <div className="category-pm-frame">
        <div className="category">
          <span>상의</span>
          <span>하의</span>
          <span>신발</span>
          <span>신발</span>
          <span>아우터</span>
        </div>
        <div className="main-pm-frame">
          <PmList result={result} />
        </div>
      </div>
    </main>
  );
}
