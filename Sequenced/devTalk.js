let pfs = [90, 92, 94];

function intro(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    // this.choice = new Choice(game, "yes", "no", "maybe");

    let stream = "good";

    let secondaryStage = 0;
    this.update = () => {

        if (this.stage == 0) {
            game.goodDialogBoxes = false;
            // play the (no existent) game normally
            if (new Date() - timer > 30000) { // ten seconds pass
                this.stage++;
                blankRoom(game); //room is reset
                secondaryStage = 0;
            }

            let s = "";
            if (secondaryStage == 0) {
                s = "press E to pick up items";
                if (game.player.item) secondaryStage = 1;
            } else if (secondaryStage == 1) {
                s = "hold plant to nurture";
                if (game.player.item.isGrown) s = "";
                if (game.player.item.isGrown && game.player.item.isGrown()) {
                    secondaryStage = 2;
                }
            } else if (secondaryStage == 2) {
                s = "friend";
            }

            R.lset(0);
            R.put(s, 200 - s.length * 4, 120 - 4, 22);
        } else if (this.stage == 1) {
            if (game.player.item) { // once player touches an item
                this.stage++;
                timer = new Date();
                blankRoom(game, true); // room reset, no items
            }

            let s = "error"
            R.lset(0);
            R.put(s, 200 - s.length * 4, 120 - 4, 22);
        } else if (this.stage == 2) {
            if (new Date() - timer > 5000) { // 5 seconds pass
                this.stage++;
                timer = new Date();
                let lines = "test test\n(space)\n\n\nCan you read this?";
                game.dialog = new Dialog(game, pfs, lines);
            }
        } else if (this.stage == 3) {
            if (game.dialog) timer = new Date();
            if ((btn.left || btn.right || btn.up || btn.down) && !game.dialog && new Date() - timer > 1000) {
                this.stage++;
                timer = new Date();
            } else if (new Date() - timer > 5000 && !game.dialog && secondaryStage == 0) {
                game.dialog = new Dialog(game, pfs, "Move around or something if you understand this");
                secondaryStage++;
            } else if (new Date() - timer > 10000 && !game.dialog && secondaryStage == 1) {
                game.dialog = new Dialog(game, pfs, "Last chance...");
                secondaryStage++;
            } else if (new Date() - timer > 30000 && !game.dialog && secondaryStage == 2) {
                game.dialog = new Dialog(game, pfs, "Thank god");
            }
        } else if (this.stage == 4) {
            if (new Date() - timer > 2000 && !game.dialog) {
                timer = new Date();
                this.stage++;
                let line = `Shit\n\n\n\nSo I am going crazy.\n\n\n
Well since you're here, I guess it's an excuse to finish these dialog boxes.`
                game.dialog = new Dialog(game, pfs, line);
                // blankRoom(game);
                // new Ball(game, 260, 160);
                new Ball(game, 300, 140);
            }
        } else if (this.stage == 5) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 20000 && !game.dialog) {
                this.stage++;
                game.goodDialogBoxes = true;
                let line = "Voila!\n\n\n\nHow does it look now?";
                game.dialog = new Dialog(game, pfs, line);
            }
        } else if (this.stage == 6) {
            if (game.dialog) timer = new Date();
            if ((btn.left || btn.right || btn.up || btn.down) && !game.dialog) {
                this.stage++;
                let line = "wait hold up...";
                game.dialog = new Dialog(game, pfs, line);
            }
        } else if (this.stage == 7) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 5000 && !game.dialog) {
                blankRoom(game);
                this.stage++;
                this.choice = new Choice(game, 88, "looks shit", "looks good");
            }
        } else if (this.stage == 8) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, `Seriously? Ouch.\n\n\n
You'll have to suck it up cause I'm not changing it.`);
                    stream = "bad";
                } else if (answer == 2) {
                    game.dialog = new Dialog(game, pfs, `Nice              `);
                    stream = "good";
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 9) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                let line = `I have to take care of some shit.\n\n\nI won't shut you off.
But don't mess with anything ok?`;
                game.dialog = new Dialog(game, pfs, line);
            }
        } else if (this.stage == 10) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 5000 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.currentNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }

    }

}

function DevTalkbad1() {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {

    }
}
