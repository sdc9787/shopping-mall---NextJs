"use client";

import { useState } from "react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      // 파일이 선택되지 않았을 경우에 대한 처리
      return;
    }

    const formData = new FormData();
    formData.append("yourFieldName", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // 응답 데이터를 처리합니다.
      } else {
        console.error("파일 업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 요청 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">업로드</button>
    </form>
  );
}
