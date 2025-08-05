import './App.css'
import AppRouter from './routes/AppRouter'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter>
      <ThemeProvider>
      <Navbar />
      <AppRouter />
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;





