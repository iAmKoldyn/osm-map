import "./index.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Map from "./components/map/map";
import Header from "./components/header/header";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Map />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
