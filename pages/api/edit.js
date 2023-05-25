import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(a, b) {
  if (a.method == "POST") {
    let c = {
      category: a.body.category,
      name: a.body.name,
      price: a.body.price,
      count: a.body.count,
      email: a.body.email,
      nickname: a.body.nickname,
    };
    const db = (await connectDB).db("product"); //데이터 베이스 접근
    let result = await db.collection("info").updateOne({ _id: new ObjectId(a.body._id.toString()) }, { $set: c });
    b.redirect(302, "/pm");
  }
}
