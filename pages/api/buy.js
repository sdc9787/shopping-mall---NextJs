import { connectDB } from "@/util/database";

export default async function handler(a, b) {
  if (a.method == "POST") {
    const db = (await connectDB).db("basket"); //데이터 베이스 접근

    let c = {
      session_email: a.body.session_email,
      session_id: a.body.session_id,
      category: a.body.category,
      name: a.body.name,
      price: a.body.price,
      count: a.body.count,
      email: a.body.email,
      nickname: a.body.nickname,
      myImage: a.body.myImage,
      selcter_count: a.body.selcter_count,
    };

    let result = await db.collection("mybasket").insertOne(c);
    b.redirect(302, "/basket");
  }
}
