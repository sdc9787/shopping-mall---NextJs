import Link from "next/link";

export default function Create() {
  return (
    <div>
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

      <h4 className="create-title">상품등록</h4>
      <div className="create-frame">
        <div className="create-img">
          <img src="https://assets.burberry.com/is/image/Burberryltd/B6235150-2B92-4C8B-AF80-2708891A87D1?$BBY_V2_SL_1x1$&wid=1251&hei=1251" />
        </div>
        <form className="create-form" action="/api/new" method="POST">
          <span>카테고리</span>
          <input name="category" placeholder="카테고리" />
          <span>상품명</span>
          <input name="name" placeholder="상품명" />
          <span>가격</span>
          <input name="price" placeholder="가격" />
          <span>수량</span>
          <input name="count" placeholder="수량" />
          <input style={{ display: "none" }} name="p_id" placeholder="글내용" />
          <button type="submit">상품등록</button>
        </form>
      </div>
    </div>
  );
}
