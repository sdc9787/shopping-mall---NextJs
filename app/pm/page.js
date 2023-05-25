import Link from "next/link";
import ListItem from "./ListItem";
import { connectDB } from "@/util/database";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { LogOutBtn } from "../LogOutBtn";
import LoginBtn from "../LoginBtn";
import { redirect } from "next/dist/server/api-utils";

export const dynamic = "force-dynamic";

export default async function Pm() {
  let session = await getServerSession(authOptions);
  const db = (await connectDB).db("product"); //데이터 베이스 접근
  let result = await db.collection("info").find({ email: session.user.email }).toArray();
  console.log(result);
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });

  return (
    <div className="pm-frame">
      <div className="navbar">
        <div className="navbar-table">
          <Link className="navbar-title" href="/">
            THESINSA
          </Link>
          <Link className="navbar-a" href="#">
            마이페이지
          </Link>
          <Link className="navbar-a" href="#">
            카테고리
          </Link>
          <Link className="navbar-a" href="#">
            장바구니
          </Link>
          <Link className="navbar-a pm-active" href="/pm">
            상품관리
          </Link>
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

      <div className="pm-title">
        <span>상품관리</span>
        <Link href={"/create"} className="pm-create">
          상품등록
        </Link>
      </div>

      <div className="list-bg">
        <ListItem result={result} />
      </div>
    </div>
  );
}
