import { Container, Sprite } from "pixi.js";
import gsap from "gsap";

/* Container class for a card */
export default class Card extends Container {

    constructor(frontTexture, backTexture, width, height) {
        super();

        // A container to animate flipping
        this.flipContainer = new Container();
        this.addChild(this.flipContainer);

        // Add front/back photos to the container for flipping
        this.front = new Sprite(frontTexture);
        this.back = new Sprite(backTexture);

        this.back.visible = false; // Initially the back is hidden

        this.flipContainer.addChild(this.front);
        this.flipContainer.addChild(this.back);

        // Set sizes, both must have the same height and width
        // We are setting the heigth and width of the front to the height and width of the back, for consistency.
        this.front.width = this.back.width = width;
        this.front.height = this.back.height = height;

        // Pivot center so flip happens at the middle
        // Default pivot is top-left. Ex: when you rotate, it rotates top-left, so we need to change the default.
        this.flipContainer.pivot.set(width / 2, height / 2);
        // ---set this in the future---
        this.flipContainer.position.set(width / 2, height / 2);

        this.flipped = false;

        this.interactive = true;
        this.on("pointerdown", () => this.flip());
    }

    flip() {
        const shownSide = this.flipped ? this.front : this.back;
        const hiddenSide = this.flipped ? this.back : this.front;

        // First half of the animation, card becomes thin
        gsap.to(this.flipContainer.scale, {
            x: 0,
            duration: 0.25,
            onComplete: () => {
                hiddenSide.visible = false;
                shownSide.visible = true;

                // Second half of the animation, card goes back to its original size
                gsap.to(this.flipContainer.scale, {
                    x: 1,
                    duration: 0.25
                });
            }
        });

        this.flipped = !this.flipped;
    }
}
