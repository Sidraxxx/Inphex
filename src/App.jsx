import './App.css'
import AppRouter from './routes/AppRouter'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <div>
      <ThemeProvider>
      <Navbar />
      <AppRouter />
      </ThemeProvider>
    </div>
  );
}

export default App;





