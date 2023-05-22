import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(a, b) {
  if (a.method == "POST") {
    let hash = await bcrypt.hash(a.body.password, 10);
    a.body.password = hash;
    const db = (await connectDB).db("check_user"); //데이터 베이스 접근
    let c = {
      name: a.body.name,
      password: hash,
      c: a.body.c,
    };
    let result;
    if (a.body.c == "1") result = await db.collection("consumer").insertOne(c);
    else if (a.body.c == "2") result = await db.collection("seller").insertOne(c);
    b.redirect(302, "/login");
  }
}
