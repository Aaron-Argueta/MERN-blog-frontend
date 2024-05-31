import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
        <Navbar />
        <div className = "pages">
          <Routes>
            <Route 
              path = "/"
              element = {<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* NOTE
    - front and back end must be running at the same time
    - 2 terminals
    - backend: npm run dev; frontend: npm start
*/
