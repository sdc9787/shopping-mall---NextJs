import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(a, b) {
  if (a.method == "POST") {
    const db = (await connectDB).db("basket"); //데이터 베이스 접근
    let result = await db.collection("mybasket").deleteOne({ _id: new ObjectId(a.body._id.toString()) });
    b.redirect(302, "/basket");
  }
}
