import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { LogOutBtn } from "../LogOutBtn";
import LoginBtn from "../LoginBtn";

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

      <h4 className="create-title">상품등록</h4>
      <div className="create-frame">
        <div className="create-img">
          <img src="https://assets.burberry.com/is/image/Burberryltd/B6235150-2B92-4C8B-AF80-2708891A87D1?$BBY_V2_SL_1x1$&wid=1251&hei=1251" />
        </div>
        <form className="create-form" action="/api/new" method="POST">
          <span>카테고리</span>
          <select name="category" className="category-select">
            <option value="top">상의</option>
            <option value="pants">하의</option>
            <option value="shoes">신발</option>
            <option value="onepiece">원피스</option>
            <option value="outer">아우터</option>
            <option value="bag">가방</option>
            <option value="socks">양말</option>
            <option value="jewelry">패션소품</option>
          </select>
          <span>상품명</span>
          <input name="name" placeholder="상품명" />
          <span>가격</span>
          <input name="price" placeholder="가격" />
          <span>수량</span>
          <input name="count" placeholder="수량" />
          <input style={{ display: "none" }} name="email" value={session.user.email} defaultValue={""} />
          <input style={{ display: "none" }} name="nickname" value={session.user.name} defaultValue={""} />
          <button type="submit">상품등록</button>
        </form>
      </div>
    </div>
  );
}
