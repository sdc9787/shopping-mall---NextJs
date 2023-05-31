import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { signOut } from "next-auth/react";

export default async function handler(a, b) {
  var db = (await connectDB).db("check_user");

  const pwcheck = await bcrypt.compare(a.body.password, a.body.session);
  if (!pwcheck) {
    console.log("비번틀림");
    b.redirect(302, "/mypage");
  } else {
    let hash = await bcrypt.hash(a.body.newpassword, 10);
    a.body.newpassword = hash;
    let result1 = await db.collection("consumer").updateOne({ email: a.body.id }, { $set: { password: a.body.newpassword } });
    b.redirect(302, "/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F");
  }
}
