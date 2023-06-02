import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(a, b) {
  if (a.method == "POST") {
    console.log(a.body.session_email);

    const db = (await connectDB).db("basket"); //데이터 베이스 접근
    let result = await db.collection("mybasket").find({ session_email: a.body.session_email }).toArray();

    let value = result;
    console.log(result);

    value.map(async (d, i) => {
      let c = {
        category: value[i].category,
        name: value[i].name,
        price: value[i].price,
        count: parseInt(value[i].count) - value[i].selcter_count,
        email: value[i].email,
        nickname: value[i].nickname,
        myImage: value[i].myImage,
      };
      console.log(value[i]._id.toString());
      const db2 = (await connectDB).db("product"); //데이터 베이스 접근
      let value2 = await db2.collection("info").updateOne({ _id: new ObjectId(value[i].session_id.toString()) }, { $set: c });
      let result2 = await db.collection("mybasket").deleteOne({ _id: new ObjectId(value[i]._id.toString()) });
    });

    b.redirect(302, "/basket");
  }
}
