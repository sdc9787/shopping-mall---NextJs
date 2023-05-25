import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(a, b) {
  if (a.method == "POST") {
    let hash = await bcrypt.hash(a.body.password, 10);
    a.body.password = hash;
    const db = (await connectDB).db("check_user"); //데이터 베이스 접근
    let result_consumer = await db.collection("consumer").find().toArray();
    for (var key in result_consumer) {
      const value = result_consumer[key].email;
      if (a.body.email == value) {
        b.redirect(302, "/signup");
        return;
      }

      let c = {
        name: a.body.name,
        password: hash,
        email: a.body.email,
      };
      let result;
      result = await db.collection("consumer").insertOne(c);
      b.redirect(302, "/login");
    }
  }
}
