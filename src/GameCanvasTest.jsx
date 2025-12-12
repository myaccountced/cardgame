/* Just a test GameCanvas. This is the react component that has the Pixijs container */
import React, { useEffect, useRef } from "react";
import { Application, Assets, Sprite, Container } from "pixi.js";

export default function GameCanvasTest() {
    const canvasRef = useRef(null); // This will hold the div to attach PIXI canvas

    useEffect(() => {
        let app;
        (async () => {
            // Create the PIXI application
            app = new Application();

            // Initialize the application
            await app.init({ background: "#1099bb", resizeTo: window });

            // Append PIXI canvas to our React div
            if (canvasRef.current) {
                canvasRef.current.appendChild(app.canvas);
            }

            // Create container
            const container = new Container();
            app.stage.addChild(container);

            // Load texture
            const texture = await Assets.load(
                "https://pixijs.com/assets/bunny.png"
            );

            // Add 5x5 grid of bunnies
            for (let i = 0; i < 25; i++) {
                const bunny = new Sprite(texture);
                bunny.x = (i % 5) * 40;
                bunny.y = Math.floor(i / 5) * 40;
                container.addChild(bunny);
            }

            // Center the container
            container.x = app.screen.width / 2;
            container.y = app.screen.height / 2;
            container.pivot.x = container.width / 2;
            container.pivot.y = container.height / 2;

            // Animate
            app.ticker.add((time) => {
                container.rotation -= 0.01 * (time.deltaTime || 1);
            });
        })();

        //return () => {}; // Optional
    }, []);

    return <div ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
