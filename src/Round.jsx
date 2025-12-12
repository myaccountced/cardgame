import { Assets } from "pixi.js";
import Card from "./Card";

/* A game's round */
export default class Round {
    constructor(app, roundNumber = 1) {
        this.app = app; // PIXI application
        this.roundNumber = roundNumber;
        this.cards = [];
    }

    // Initialize the round with a given # of cards
    async init(numCards = 6) {
        // Set up the card textures
        const frontTexture = await Assets.load("./cards/mewto.jpg");
        const backTexture = await Assets.load("./cards/pokemon-card-back.jpg");

        const spacing = 0.5;

        for (let i = 0; i < numCards; i++) {
            const cardSizeWidth = 200;
            const cardSizeHeight = 300;

            // Create card instance and center it
            const card = new Card(frontTexture, backTexture, cardSizeWidth, cardSizeHeight);

            // Calculate the position
            card.x = (this.app.screen.width / 6) + i * (card.width + 20);
            card.y = this.app.screen.height / 3;

            // Add the card to stage and the cards list
            this.app.stage.addChild(card);
            this.cards.push(card);
        }
    }

    // End the round
    end() {
        // Remove all cards from stage
        this.cards.forEach(card => {
            if (card.parent) {
                card.parent.removeChild(card)
            }
        });

        this.cards = [];
    }

}
