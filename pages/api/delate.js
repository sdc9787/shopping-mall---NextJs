import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(a, b) {
  if (a.method == "POST") {
    console.log(a.body);
    const db = (await connectDB).db("forum"); //데이터 베이스 접근
    let result = await db.collection("post").deleteOne({ _id: new ObjectId(a.body) });
    b.status(200).json("삭제완료");
  }
}
