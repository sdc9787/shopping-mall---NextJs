import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="navbar">
        <div className="navbar-table">
          <a className="navbar-title" href="index.html">
            THESINSA
          </a>
          <a className="navbar-a" href="#">
            마이페이지
          </a>
          <a className="navbar-a" href="#">
            카테고리
          </a>
          <a className="navbar-a" href="#">
            장바구니
          </a>
          <a className="navbar-a" href="/pm">
            상품관리
          </a>
        </div>

        <div className="navber-login-sginup-search">
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
          <form>
            <input className="search" placeholder="검색" type="search" />
          </form>
        </div>
      </div>
    </main>
  );
}
