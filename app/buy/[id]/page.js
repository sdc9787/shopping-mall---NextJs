import { LogOutBtn } from "@/app/LogOutBtn";
import LoginBtn from "@/app/LoginBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Edit(props) {
  const db = (await connectDB).db("product"); //데이터 베이스 접근
  let result = await db.collection("info").findOne({ _id: new ObjectId(props.params.id) });
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

      <div className="pm-title">
        <span>상품 구매</span>
      </div>
      <div className="create-frame">
        <div className="create-img">
          <img src="https://assets.burberry.com/is/image/Burberryltd/B6235150-2B92-4C8B-AF80-2708891A87D1?$BBY_V2_SL_1x1$&wid=1251&hei=1251" />
        </div>

        <div className="pro-info-frame">
          <div className="pro-info">
            <span>판매자 정보</span>
            <span>판매자 : {result.nickname}</span>
            <span>이메일 : {result.email}</span>
            <span>상품 정보</span>
            <span>카테고리 : {result.category}</span>
            <span>상품명 : {result.name}</span>
            <span>가격 : {result.price}</span>
            <span>수량 : {result.count}</span>
          </div>
          {session ? (
            session.user.root == 1 ? (
              <form action="/api/basket" method="POST">
                <button>장바구니</button>
              </form>
            ) : (
              <div></div>
            )
          ) : (
            <Link className="navbar-a" href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              장바구니
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
