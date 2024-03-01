import { Route, Routes } from "react-router-dom";
import Main from "./Components/Pages/Main";
import History from "./Components/Pages/History";
import Navbar from "./Components/Navbar";
import { useState } from "react";

function App() {
  const [searchedWords, setSearchedWords] = useState<string[]>([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              usedWords={searchedWords}
              setSearchedWords={setSearchedWords}
            />
          }
        />
        <Route
          path="/history"
          element={<History usedWords={searchedWords} />}
        />
      </Routes>
    </>
  );
}

export default App;
