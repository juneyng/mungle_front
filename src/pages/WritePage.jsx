import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

function WritePage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:8080/api/analyze", {
        text,
      });
      setResult(response.data);
    } catch (err) {
      setError("분석 중 오류가 발생했어요. 다시 시도해 주세요.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      <Button variant="contained" onClick={handleAnalyze} disabled={loading}>
        {loading ? "분석 중..." : "멍글해보기"}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>결과</h3>
          <p>감정: {result.emotion}</p>
          <p>위로: {result.message}</p>
        </div>
      )}
    </div>
  );
}
export default WritePage;
