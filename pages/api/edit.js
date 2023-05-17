import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(a, b) {
  if (a.method == "POST") {
    let c = {
      category: a.body.title,
      name: a.body.content,
      parice: a.body.parice,
      count: a.body.count,
      p_id: a.body.p_id,
    };
    const db = (await connectDB).db("forum"); //데이터 베이스 접근
    let result = await db.collection("post").updateOne({ _id: new ObjectId(a.body._id) }, { $set: c });
    b.redirect(302, "/list");
  }
}
