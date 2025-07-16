import { useState } from "react";
import { TextField, Button } from "@mui/material";

function WritePage() {
  const [text, setText] = useState("");
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>아무 말이나 적어보세요...</h2>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        rows={4}
        fullWidth
        placeholder="오늘 마음이 어때요?"
        style={{ marginBottom: "20px" }}
      />
      <Button variant="contained">멍글해보기</Button>
    </div>
  );
}
export default WritePage;
