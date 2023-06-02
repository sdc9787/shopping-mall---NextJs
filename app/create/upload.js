"use client";

import { useState } from "react";

export default function PrivatePage({ session }) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    // console.log("file", image)
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body,
    });
  };

  return (
    <div>
      <div>
        <form className="create-form" action="/api/new" method="POST">
          <div className="img-upload">
            <img src={createObjectURL} />
            <input type="file" name="myImage" onChange={uploadToClient} />
          </div>
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
            <input name="name" placeholder="상품명" pattern="\S(.*\S)?" required />
            <span>가격</span>
            <input name="price" placeholder="가격(원)" type="number" min="0" pattern="\S(.*\S)?" required />
            <span>수량</span>
            <input name="count" placeholder="수량(개)" type="number" min="0" pattern="\S(.*\S)?" required />
            <input style={{ display: "none" }} name="email" value={session.user.email} defaultValue={""} />
            <input style={{ display: "none" }} name="nickname" value={session.user.name} defaultValue={""} />
            <button type="submit" onClick={uploadToServer}>
              상품등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
