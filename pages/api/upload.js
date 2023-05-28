import multer from "multer";

const upload = multer({ dest: "public/uploads/" });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await upload.single("image")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error("Error uploading file1:", err);
        return res.status(500).json({ error: "Error uploading file1" });
      } else if (err) {
        console.error("Error uploading file2:", err);
        return res.status(500).json({ error: "Error uploading file2" });
      }

      const { file } = req;
      // Handle the uploaded file as per your requirement (e.g., store it in a database, process it, etc.)
      return res.status(200).json({ message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error("Error uploading file3:", error);
    return res.status(500).json({ error: "Error uploading file3" });
  }
}
