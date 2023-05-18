"use client";

import Link from "next/link";

export default function ListItem({ result }) {
  return (
    <div>
      {result.map((a, i) => (
        <Link href={"/edit/" + result[i]._id.toString()}>
          <div className="list-item" key={i}>
            <h4>{result[i].name}</h4>
          </div>
        </Link>
      ))}
    </div>
  );
}
