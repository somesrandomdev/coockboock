import { useState } from "react";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate generating a recipe
    setTimeout(() => {
      setResult("Sample Recipe: Mix the ingredients and cook for 20 minutes. Enjoy your meal!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          AI-Powered <span className="highlight">Recipe Generator</span>
        </h1>
        <p className="description">
          Enter a list of ingredients, and let AI create delicious recipes for you!
        </p>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="search-container">
          <textarea
            className="wide-input"
            placeholder="Enter ingredients separated by commas (e.g., chicken, rice, broccoli)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Generating..." : "Generate Recipe"}
          </button>
        </div>
      </form>
      {result && (
        <div className="result-container">
          <div className="result">{result}</div>
        </div>
      )}
    </div>
  );
}

export default App;
