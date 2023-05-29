import formidable from "formidable";

import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "허용되지 않는 메소드입니다" });
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: "양식 데이터 처리에 실패했습니다" });
    } else {
      const file = files.yourFieldName; // yourFieldName은 업로드할 필드 이름으로 변경해야 합니다.

      const oldPath = file.path;
      const fileName = file.name;
      const newPath = path.join(process.cwd(), "public", "uploads", fileName); // 업로드할 경로 설정

      fs.renameSync(oldPath, newPath); // 파일을 새 경로로 이동

      // 추가적인 파일 처리 로직을 구현할 수 있습니다.
      // 예를 들어, 파일 정보를 데이터베이스에 저장하거나 파일의 경로를 기록하는 등의 작업을 수행할 수 있습니다.

      res.status(200).json({ success: true });
    }
  });
}
