/* React game container that has the PixiJS main container */

import React, { useEffect, useRef } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import Card from "./Card";

export default function MainGameCanvas() {
    const canvasRef = useRef(null); // Div to attach the pixi canvas

    useEffect(() => {
        let app;

        (async () => {
            // Create and initialize application
            app = new Application();
            await app.init({
                antialias: true,
                background: "#1099bb",
                resizeTo: window
            });

            if (canvasRef.current) {
                canvasRef.current.appendChild(app.canvas);
            }

            // Background for the deck
            const woodTexture = await Assets.load("./background/deck-background-wood.jpg"); // Files in public dir are served at the root path
            const woodBackground = new Sprite(woodTexture);
            // Initial size for the background
            woodBackground.width = app.screen.width;
            woodBackground.height = app.screen.height;
            // Make the background size dynamic
            app.ticker.add(() => {
                woodBackground.width = app.screen.width;
                woodBackground.height = app.screen.height;
            });
            // Add to stage to act like a background
            app.stage.addChild(woodBackground);

            // Set up the card test
            const frontTexture = await Assets.load("./cards/mewto.jpg");
            const backTexture = await Assets.load("./cards/pokemon-card-back.jpg");
            // Create card instance and center it
            const card = new Card(frontTexture, backTexture);
            //card.x = app.screen.width / 2;
            //card.y = app.screen.height / 2;
            app.stage.addChild(card);
        })();



    }, []);

    return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}