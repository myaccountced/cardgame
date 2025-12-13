import { Assets, Container } from "pixi.js";
import Card from "./Card";

/* A game's round */
export default class Round {
    constructor(app, roundNumber = 1) {
        this.app = app; // PIXI application
        this.roundNumber = roundNumber;
        this.cards = [];
        this.containers = [];

        // Root container for all cards in this round
        this.rootContainer = new Container();
        this.app.stage.addChild(this.rootContainer);
    }

    // Initialize the round with a given # of cards
    async init(numCards = 6) {
        const frontTexture = await Assets.load("./cards/mewto.jpg");
        const backTexture = await Assets.load("./cards/pokemon-card-back.jpg");

        const cardsPerRow = 6;
        const totalCards = this.cards.length + numCards;
        const rows = Math.ceil(totalCards / cardsPerRow);

        let screenW = this.app.screen.width;
        let screenH = this.app.screen.height;

        // Calculate the max card width based on screen width and row count
        let cardWidth = screenW / cardsPerRow * 0.99; // 99% of cell width
        let cardHeight = cardWidth * 1.5; // 3:2 ratio

        // Clamp card size
        let MAX_CARD_WIDTH = 180;
        let MIN_CARD_WIDTH = 90;

        if (numCards > 24) {
            MAX_CARD_WIDTH = 115;
            MIN_CARD_WIDTH = 45;
        } else if (numCards > 18) {
            MAX_CARD_WIDTH = 140;
            MIN_CARD_WIDTH = 70;
        }

        cardWidth = Math.min(Math.max(cardWidth, MIN_CARD_WIDTH), MAX_CARD_WIDTH);
        cardHeight = cardWidth * 1.5;

        // Calculate horizontal and vertical spacing for even distribution
        let horizontalSpacing = (screenW - cardWidth * cardsPerRow) / (cardsPerRow + 25);
        let verticalSpacing = (screenH - cardHeight * rows) / (rows + 10);

        this.app.ticker.add(() => {
            screenW = this.app.screen.width;
            screenH = this.app.screen.height;

            cardWidth = Math.min(Math.max(cardWidth, MIN_CARD_WIDTH), MAX_CARD_WIDTH);
            cardHeight = cardWidth * 1.5;

            horizontalSpacing = (screenW - cardWidth * cardsPerRow) / (cardsPerRow + 1);
            verticalSpacing = (screenH - cardHeight * rows) / (rows + 1);

            // Update positions of all containers dynamically if needed
            this.containers.forEach((container, index) => {
                const row = Math.floor(index / cardsPerRow);
                const col = index % cardsPerRow;
                container.x = horizontalSpacing + col * (cardWidth + horizontalSpacing);
                container.y = verticalSpacing + row * (cardHeight + verticalSpacing);
            });
        });

        for (let i = 0; i < numCards; i++) {
            const index = this.cards.length;
            const row = Math.floor(index / cardsPerRow);
            const col = index % cardsPerRow;

            // Create the card
            const card = new Card(frontTexture, backTexture, cardWidth, cardHeight);

            // Create a container for the card
            const container = new Container();
            container.addChild(card);

            // Position container evenly
            container.x = horizontalSpacing + col * (cardWidth + horizontalSpacing);
            container.y = verticalSpacing + row * (cardHeight + verticalSpacing);

            // Add to root container instead of stage
            this.rootContainer.addChild(container);

            // Store references
            this.cards.push(card);
            this.containers.push(container);
        }
    }

    // End the round
    end() {
        if (this.rootContainer.parent) this.rootContainer.parent.removeChild(this.rootContainer);
        this.cards = [];
        this.containers = [];
        this.rootContainer = new Container();
        this.app.stage.addChild(this.rootContainer);
    }
}
