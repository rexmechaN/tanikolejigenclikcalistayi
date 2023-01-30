import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Basvuru from "./pages/Basvuru";

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/basvuru" element={<Basvuru />}/>
        </Routes>
    </div>
  );
}

export default App;
