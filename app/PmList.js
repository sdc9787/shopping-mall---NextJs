"use client";

import Link from "next/link";

export default function PmList({ result }) {
  return (
    <div className="main-pm-list">
      {result.map((a, i) => (
        <Link href={"/buy/" + result[i]._id.toString()}>
          <div className="pm-list" key={i}>
            <img src={"/uploads/" + result[i].myImage} />
            <h4>{result[i].name}</h4>
            <span>{result[i].price + "  원"}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
