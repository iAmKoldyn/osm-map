import "./index.css";
import { BrowserRouter as Router } from 'react-router-dom';
import Map from "./components/map/map";

function App() {
    return (
        <Router>
            <Map />
        </Router>
    );
}

export default App;
