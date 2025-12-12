/* Main UI (React) component */

import React from "react";
import GameCanvasTest from "./GameCanvasTest";
import MainGameCanvas from "./MainGameCanvas";

export default function App() {
    return (
        <div>
            <h1>Welcome to the game! :)..this is App.jsx</h1>

            {/*<GameCanvasTest />*/}
            <MainGameCanvas />
        </div>
    );
}

