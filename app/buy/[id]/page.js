import { LogOutBtn } from "@/app/LogOutBtn";
import LoginBtn from "@/app/LoginBtn";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Buy(props) {
  const db = (await connectDB).db("product"); //데이터 베이스 접근
  let result = await db.collection("info").findOne({ _id: new ObjectId(props.params.id) }); //
  let session = await getServerSession(authOptions);
  let category = result.category;
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

      <div className="pm-title animate__animated animate__fadeIn">
        <span>상품 구매</span>
      </div>
      <div className="create-frame animate__animated animate__fadeIn">
        <div className="create-img">
          <img src={"/uploads/" + result.myImage} />
        </div>

        <div className="pro-info-frame">
          <div className="pro-info">
            <span>판매자 정보</span>
            <span>판매자 : {result.nickname}</span>
            <span>이메일 : {result.email}</span>
            <span>상품 정보</span>
            <span>카테고리 : {category}</span>
            <span>상품명 : {result.name}</span>
            <span>가격 : {result.price}</span>
            <span>남은 수량 : {result.count}</span>
          </div>
          {session ? (
            session.user.root == 1 ? (
              <form action="/api/buy" method="POST">
                <input style={{ display: "none" }} name="session_email" defaultValue={session.user.email} />
                <input style={{ display: "none" }} name="session_id" defaultValue={result._id.toString()} />
                <input style={{ display: "none" }} name="name" placeholder="상품명" defaultValue={result.name} />
                <input style={{ display: "none" }} name="price" placeholder="가격(원)" defaultValue={result.price} type="number" />
                <input style={{ display: "none" }} name="myImage" defaultValue={result.myImage} />
                <input style={{ display: "none" }} name="category" placeholder="카테고리" defaultValue={result.category} />
                <input style={{ display: "none" }} name="count" placeholder="수량(개)" defaultValue={result.count} type="number" min="0" />
                <input style={{ display: "none" }} name="email" defaultValue={result.email} />
                <input style={{ display: "none" }} name="nickname" defaultValue={result.nickname} />
                <span>수량선택</span>
                <input
                  style={{ padding: "5px", width: "40px", marginLeft: "10px", borderRadius: "5px" }}
                  name="selcter_count"
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={parseInt(result.count)}
                ></input>
                {result.count == "0" ? (
                  <button disabled style={{ width: "120px" }}>
                    품절
                  </button>
                ) : (
                  <button>장바구니</button>
                )}
              </form>
            ) : (
              <div></div>
            )
          ) : (
            <Link href="/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F">
              <form>
                <button>장바구니</button>
              </form>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
