"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <Link href={"/edit/" + result[i]._id.toString()}>
          <div className="list-item" key={i}>
            <div className="pm-name-count">
              <img className="pm-img" src={"/uploads/" + result[i].myImage} />
              <h4>{result[i].name}</h4>
            </div>
            <div className="pm-count">
              <span>남은 수량</span>
              {result[i].count}개
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
