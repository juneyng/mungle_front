import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App" style={{ textAlign: "center", padding: "50px" }}>
      <h1>멍글멍글</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/write")}
        style={{ marginTop: "20px" }}
      >
        멍글멍글하러 가기
      </Button>
    </div>
  );
}
export default App;
