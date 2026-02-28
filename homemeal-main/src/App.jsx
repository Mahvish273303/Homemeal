import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import Process from "./pages/Process.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./components/Orders.jsx";
import Navbar from './components/NavBar.jsx';
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/process" element={<Process />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="orders" element={<Orders />} /> {/* Nested Route for Orders */}
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
