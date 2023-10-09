import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from './Componet/ProductList';
import BookMarkList from './Componet/BookMarkList';

function App() {
  return (
    <Router>

      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/bookmark-list' element={<BookMarkList />} />
      </Routes>
    </Router>
  );
}

export default App;
