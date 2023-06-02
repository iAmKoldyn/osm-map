import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Map from "./components/map/map";
import Header from "./components/header/header";

function App() {
    return (
        <>
            <Header />
            <Router>
                <Map />
            </Router>
        </>
    );
}

export default App;
