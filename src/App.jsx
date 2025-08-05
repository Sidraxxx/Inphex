import './App.css'
import AppRouter from './routes/AppRouter'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'
import { BrowserRouter } from "react-router-dom";
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
