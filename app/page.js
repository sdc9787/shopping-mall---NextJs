import { connectDB } from "@/util/database";
import Link from "next/link";
import PmList from "./PmList";

export default async function Home() {
  const db = (await connectDB).db("forum"); //데이터 베이스 접근
  let result = await db.collection("post").find().toArray();

  return (
    <main>
      <div className="navbar">
        <div className="navbar-table">
          <Link className="navbar-title" href="/">
            THSINSA
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
          <Link className="navbar-a" href="/pm">
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
