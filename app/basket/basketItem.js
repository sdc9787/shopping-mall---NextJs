"use client";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BasketItem({ result }) {
  let pricecount = 0;
  return (
    <div className="list-frame">
      {result.map((a, i) => (
        <div className="list-item" key={i}>
          <div className="pm-name-count">
            <img className="pm-img" src={"/uploads/" + result[i].myImage} />
            <h4>{result[i].name}</h4>
          </div>
          <div className="pm-count basket-count">
            <span>{result[i].price}원</span>
            <span style={{ display: "none" }}>{(pricecount += parseInt(result[i].price) * parseInt(result[i].selcter_count))}</span>
            <form action="/api/basketdelate" method="POST">
              <input style={{ display: "none" }} name="_id" defaultValue={result[i]._id} />
              <span>수량 : {result[i].selcter_count}</span>
              <button type="submit" className="pm-create pm-delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </form>
          </div>
        </div>
      ))}
      <span style={{ display: "block", textAlign: "center", paddingTop: "20px", fontSize: "20px" }}>총 가격 : &nbsp;&nbsp;&nbsp;&nbsp;{pricecount} 원</span>
    </div>
  );
}
