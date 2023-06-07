import Link from "next/link";
import { connectDB } from "@/util/database";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import { redirect } from "next/dist/server/api-utils";
import { LogOutBtn } from "@/app/LogOutBtn";
import LoginBtn from "@/app/LoginBtn";
import CategoryItem from "./CategoryItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const dynamic = "force-dynamic";

export default async function Category(props) {
  let session = await getServerSession(authOptions);
  const db = (await connectDB).db("product"); //데이터 베이스 접근
  let result = await db.collection("info").find({ category: props.params.category }).toArray();
  console.log(result);
  result = result.map((a) => {
    a._id = a._id.toString();
    return a;
  });
  let category = props.params.category;
  switch (category) {
    case "top":
      category = "상의";
      break;
    case "pants":
      category = "하의";
      break;
    case "shoes":
      category = "신발";
      break;
    case "onepiece":
      category = "원피스";
      break;
    case "outer":
      category = "아우터";
      break;
    case "bag":
      category = "가방";
      break;
    case "socks":
      category = "양말";
      break;
    case "jewelry":
      category = "패션소품";
      break;
  }
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
        <form className="search-item" action="/api/search" method="POST">
          <div className="search-icon">
            <input className="search" name="search" placeholder="검색" type="search" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
          </div>
        </form>
        <div className="navber-login-sginup-search">
          {session ? (
            session.user.root == 1 ? (
              <span className="session-login">
                <span>{session.user.name}님[소비자]</span> <LogOutBtn />
              </span>
            ) : (
              <span className="session-login">
                <span>{session.user.name}님[판매자]</span> <LogOutBtn />
              </span>
            )
          ) : (
            <LoginBtn></LoginBtn>
          )}
          {session ? <span></span> : <Link href={"/signup"}>회원가입</Link>}
        </div>
      </div>

      <div className="category-pm-frame">
        <div className="category">
          <Link href="/category/top">{category == "상의" ? <span className="category-select2">상의</span> : <span>상의</span>}</Link>
          <Link href="/category/pants">{category == "하의" ? <span className="category-select2">하의</span> : <span>하의</span>}</Link>
          <Link href="/category/shoes">{category == "신발" ? <span className="category-select2">신발</span> : <span>신발</span>}</Link>
          <Link href="/category/onepiece">{category == "원피스" ? <span className="category-select2">원피스</span> : <span>원피스</span>}</Link>
          <Link href="/category/outer">{category == "아우터" ? <span className="category-select2">아우터</span> : <span>아우터</span>}</Link>
          <Link href="/category/bag">{category == "가방" ? <span className="category-select2">가방</span> : <span>가방</span>}</Link>
          <Link href="/category/socks">{category == "양말" ? <span className="category-select2">양말</span> : <span>양말</span>}</Link>
          <Link href="/category/jewelry">
            {category == "패션소품" ? (
              <span className="category-select2" style={{ marginBottom: "0px" }}>
                패션소품
              </span>
            ) : (
              <span style={{ marginBottom: "0px" }}>패션소품</span>
            )}
          </Link>
        </div>
        <span className="animate__animated animate__fadeIn" style={{ marginLeft: "120px", fontSize: "25px", fontWeight: "700" }}>
          카테고리 : {category}
        </span>
        <div className="main-pm-frame animate__animated animate__fadeIn">
          <CategoryItem result={result} />
        </div>
      </div>
    </main>
  );
}
