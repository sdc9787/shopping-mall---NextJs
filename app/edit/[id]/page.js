import { LogOutBtn } from "@/app/LogOutBtn";
import LoginBtn from "@/app/LoginBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

      <div className="pm-title">
        <span>상품수정</span>
        <form action="/api/delate" method="POST">
          <input style={{ display: "none" }} name="_id" defaultValue={result._id.toString()} />
          <button type="submit" className="pm-create pm-delete">
            상품삭제
          </button>
        </form>
      </div>
      <div className="create-frame">
        <div className="create-img">
          <img src={"/uploads/" + result.myImage} />
        </div>
        <form className="create-form" action="/api/edit" method="POST">
          <div className="product-info">
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
            <input name="name" placeholder="상품명" defaultValue={result.name} pattern="\S(.*\S)?" required />
            <span>가격</span>
            <input name="price" placeholder="가격(원)" defaultValue={result.price} type="number" min="0" pattern="\S(.*\S)?" required />
            <span>수량</span>
            <input name="count" placeholder="수량(개)" defaultValue={result.count} type="number" min="0" pattern="\S(.*\S)?" required />
            <input style={{ display: "none" }} name="_id" defaultValue={result._id.toString()} />
            <input style={{ display: "none" }} name="email" defaultValue={result.email} />
            <input style={{ display: "none" }} name="nickname" defaultValue={result.nickname} />
            <button type="submit">상품수정</button>
          </div>
        </form>
      </div>
    </div>
  );
}
