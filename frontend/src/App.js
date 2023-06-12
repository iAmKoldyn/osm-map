import "./index.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Header from "./components/header/header";
import {layersContext} from "./contex";
import {layers} from "./__data__";
import MainPage from "./pages/main-page";

function App() {
    return (
        <>
            <BrowserRouter>
                <layersContext.Provider value={{layers}}>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                    </Routes>
                </layersContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
