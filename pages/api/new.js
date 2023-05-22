import { connectDB } from "@/util/database";

export default async function handler(a, b) {
  if (a.method == "POST") {
    const db = (await connectDB).db("forum"); //데이터 베이스 접근
    let result = await db.collection("post").insertOne(a.body);
    b.redirect(302, "/pm");
  }
}
