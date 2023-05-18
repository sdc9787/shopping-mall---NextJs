"use client";

import Link from "next/link";

export default function PmList({ result }) {
  return (
    <div className="main-pm-list">
      {result.map((a, i) => (
        <Link href={"/edit/" + result[i]._id.toString()}>
          <div className="pm-list" key={i}>
            <img src="https://assets.burberry.com/is/image/Burberryltd/B6235150-2B92-4C8B-AF80-2708891A87D1?$BBY_V2_SL_1x1$&wid=1251&hei=1251" />
            <h4>{result[i].name}</h4>
            <span>{result[i].price}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
