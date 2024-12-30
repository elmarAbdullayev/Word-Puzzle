import Home from "./components/Home";
import {Provider} from "./components/HangmanContext";
import GamePage from "./components/GamePage";
import {BrowserRouter, Routes,Route} from "react-router-dom";

function App() {
  return (
      <Provider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                 <Route path="gamepage" element={<GamePage/>}/>
              </Routes>
          </BrowserRouter>

      </Provider>

  );
}

export default App;
