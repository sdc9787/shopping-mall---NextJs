import Link from "next/link";
import ListItem from "./ListItem";
import { connectDB } from "@/util/database";

export const dynamic = "force-dynamic";

export default async function Pm() {
  const db = (await connectDB).db("forum"); //데이터 베이스 접근
  let result = await db.collection("post").find().toArray();

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
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
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
