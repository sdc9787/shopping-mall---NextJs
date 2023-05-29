import { connectDB } from "@/util/database";

export default async function handler(a, b) {
  if (a.method == "POST") {
    const db = (await connectDB).db("product"); //데이터 베이스 접근
    let time = parseInt(Date.now() / 1000);
    let c = {
      category: a.body.category,
      name: a.body.name,
      price: a.body.price,
      count: a.body.count,
      email: a.body.email,
      nickname: a.body.nickname,
      myImage: time + a.body.myImage,
    };

    let result = await db.collection("info").insertOne(c);
    b.redirect(302, "/pm");
  }
}
