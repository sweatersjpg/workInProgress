let pfs = [90, 92, 94];

function Intro(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    // this.choice = new Choice(game, "yes", "no", "maybe");

    let stream = "good";

    let secondaryStage = 0;
    this.update = () => {

        if (this.stage == 0) {
            // play the (no existent) game normally
            if (secondaryStage != 2) timer = new Date();

            if (new Date() - timer > 2000) { // ten seconds pass
                this.stage++;
                blankRoom(game); //room is reset
                secondaryStage = 0;
                if (SOUND) music.stop();
                if (SOUND) music.loop();
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
                if (SOUND) music.stop();
            }

            let s = "error"
            R.lset(0);
            R.put(s, 200 - s.length * 4, 120 - 4, 22);
        } else if (this.stage == 2) {
            game.goodDialogBoxes = false;
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
                let line = `Shit\n\n\n\nSo I am going crazy.\n\n\n\nWell since you're here, I guess it's an excuse to finish these dialog boxes.\ndon't go anywhere...`
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
                this.choice = new Choice(game, 88, "needs work", "looks good");
            }
        } else if (this.stage == 8) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, `Yeah?\n\n\n\nI think you'll have to suck it up for now cause I'm too lazy to change it.`);
                    stream = "bad";
                } else if (answer == 2) {
                    game.dialog = new Dialog(game, pfs, `I'm glad you think so`);
                    stream = "good";
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 9) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                let line = `I have to take care of some stuff...\n\n\nDon't mess with anything ok?`;
                game.dialog = new Dialog(game, pfs, line);
            }
        } else if (this.stage == 10) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 4000) {
                let s = "error"
                R.lset(0);
                R.put(s, 200 - s.length * 4, 120 - 4, 22);
            }
            if (new Date() - timer > 5000 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.nextNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }

    }

}

// BAD

function DEVbad1(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game, true);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Hey you still there?");
            }
        } else if (this.stage == 1) {
            if (!game.dialog) {
                this.stage++;
                this.choice = new Choice(game, 0, "");
            }
        } else if (this.stage == 2) {
            let answer = this.choice.answer();
            if (answer) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Nice\nGood to know the buttons still work.");
                this.choice = this.choice.kill();
            }
        } else if (this.stage == 3) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "You know...\n\n\n\nI feel like I really can't do shit.");
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "There's a reason there's only buttons and a dumb plant.");
            }
        } else if (this.stage == 5) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1500 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I can't even make a player character without literally going insane.");
            }
        } else if (this.stage == 6) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 3000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I know this sounds stupid since there's no reason for me to believe you, but...\nYou're not real right? You're just in my head?");
            }
        } else if (this.stage == 7) {
            if (!game.dialog) {
                this.stage++;
                this.choice = new Choice(game, 64, "head", "real");
            }
        } else if (this.stage == 8) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "I'm not going to doubt that.\n\n\nSane people don't see their shitty sprites come to life like this...");
                    stream = "bad";
                } else if (answer == 2) {
                    game.dialog = new Dialog(game, pfs, "I guess there's a chance that I'm not crazy...");
                    stream = "good";
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 9) {
            if (game.dialog) timer = new Date();
            else {
                let s = "error"
                R.lset(0);
                R.put(s, 200 - s.length * 4, 120 - 4, 22);
            }
            if (new Date() - timer > 500 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Fuck not again");
            }
        } else if (this.stage == 10) {
            let s = "error"
            R.lset(0);
            R.put(s, 200 - s.length * 4, 120 - 4, 22);
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 100 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.nextNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }
    }
}

function DEVbad2(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Fuck how did you even get there?\n\n\nThat place isn't safe\n\n\n\nI don't even know how it got in this game...");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Fuck I'm useless\n\n\n\nNot even my imaginary friend is safe.\n\n\nI don't want to do this anymore.");
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 4000 && !game.dialog) {
                this.stage++;
                game.actors = [game.player];
                new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);
                this.choice = new Choice(game, 128, "keep going", "take a break");
            }
        } else if (this.stage == 3) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "I'll try...");
                    stream = "good";
                } else if (answer == 2) {
                    stream = "bad";
                    timer = new Date();
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 1000) {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 3000 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.nextNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }
    }
}

function DEVbad3(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game, true);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I've been thinking\n\n\n\nEven if you are in my head\n\n\nyou're still the closest thing I have to  a friend right now.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I was just wondering...\n\n\n\nIf I stopped working on this game, what would happen to you?");
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.actors = [game.player];
                new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);
                this.choice = new Choice(game, 98, "persist", "perish");
            }
        } else if (this.stage == 3) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "Well if you're going to be here anyway...\n\n\nI guess I can try and make you proud and try to finish this fucking game");
                    stream = "good";
                } else if (answer == 2) {
                    stream = "bad";
                    game.dialog = new Dialog(game, pfs, "So you would be gone for good...\n\n\nIt's not normal for someone to see their character come to life like this...\nIt's probably best that I quit this and just get help...\n\nI'm sorry...");
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Thank you for being here for me.");
            }
        } else if (this.stage == 5) {
            if (game.dialog) timer = new Date();
            else {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                if (stream == "bad") {
                    game.nextScene = false;
                    game.nextNPC = CreditsCat;
                } else {
                    game.nextScene = scenes[stream].pop();
                    game.nextNPC = npcs[stream].pop();
                }
                blankRoom(game, false);
                game.nextRoom(true);
                // new Pot(game, 200, 120);
            }
        }
    }
}

// GOOD

function DEVgood1(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {
        if (this.button && this.button.justActivated) {
            new Ball(game, 200, 120);
        }

        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Oh hey\n\n\n\nI was just fiddling with the button script, check this out.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 100 && !game.dialog) {
                this.stage++;
                this.button = new Button(game, 200, 96, "");
            }
        } else if (this.stage == 2) {
            if (game.actors.length == 8) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Pretty cool eh?\n\n\n\nI still don't know what to do with any of these mechanics.\n\nI probably should have planned it out better...");
            }
        } else if (this.stage == 3) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Are they boring?\n\n\n\nOr do you think I can work with them a bit?");
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 500 && !game.dialog) {
                this.stage++;
                game.actors = [game.player];
                this.button = false;
                new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);
                this.choice = new Choice(game, 98, "boring", "potential");
            }
        } else if (this.stage == 5) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "yeah...\nI figured...\n\n\nThank you for letting me know.");
                    stream = "bad";
                } else if (answer == 2) {
                    stream = "good";
                    game.dialog = new Dialog(game, pfs, "You think?\n\n\n\nThanks,\nI guess I'll go work on them bit more.");
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 6) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 1000) {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.nextNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }
    }
}

function DEVgood2(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game, true);
    new Pot(game, 200, 120);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 500) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "So...\n\n\n\nWhat do you think of the potted plant so far?");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 500 && !game.dialog) {
                this.stage++;
                this.choice = new Choice(game, 98, "perfect", "needs work");
            }
        } else if (this.stage == 2) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "Are you just being positive to make me feel better?");
                    stream = "bad";
                } else if (answer == 2) {
                    stream = "good";
                    game.dialog = new Dialog(game, pfs, "I agree.");
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 3) {
            if (!game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "It definitely needs more work.\n\n\nI was originally going to have a watering can for feeding the plants\n\nBut I wasn't sure how that would work out.\n\n\nMaybe I'll take a crack at it.");
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 500 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Thanks for your feedback!");
            }
        } else if (this.stage == 5) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 1000) {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                game.nextScene = scenes[stream].pop();
                game.nextNPC = npcs[stream].pop();
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }
    }
}

function DEVgood3(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game, true);
    new Pot(game, 240, 120);
    // new Can(game, 220, 130);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I have added the watering can!\n\n\nHere it is.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 100 && !game.dialog) {
                this.stage++;
                new Can(game, 220, 130);
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "It's not functional yet\n\n\n\nYou can just pick it up like other items");
            }
        } else if (this.stage == 3) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 0 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I think I'll have to restructure the whole item code\n\nsince there is no space for a special interaction with another item.\n\nI need to make it so that when you're next to the plant with the watering can,\nit will play the watering animation and grow the plant instead of just dropping it.");
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "The real question is:\nDo you think I could make a game with this?");
            }
        } else if (this.stage == 5) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 500 && !game.dialog) {
                this.stage++;
                game.actors = [game.player];
                new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);
                this.choice = new Choice(game, 98, "No", "Yes");
            }
        } else if (this.stage == 6) {
            let answer = this.choice.answer();
            if (answer) {
                if (answer == 1) {
                    game.dialog = new Dialog(game, pfs, "Thank you for your honesty.");
                    stream = "bad";
                } else if (answer == 2) {
                    stream = "good";
                    game.dialog = new Dialog(game, pfs, "You really think so?\n\n\n\nI think it's doable. I just have to work with what I have,\n\nand make sure the scope doesn't get to out of hand.");
                }
                this.choice = this.choice.kill();
                this.stage++;
            }
        } else if (this.stage == 7) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 1000) {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                if (stream == "good") {
                    game.nextScene = GoodEnd;
                    game.nextNPC = NPCgoodEnd;
                } else {
                    game.nextScene = scenes[stream].pop();
                    game.nextNPC = npcs[stream].pop();
                }
                blankRoom(game, false);
                game.nextRoom(true);
                new Pot(game, 200, 120);
            }
        }
    }
}

// endings

function GoodEnd(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I've decided I'm going to finish this game no matter what.\n\nI think it'll be good for me.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "But...\n\n\n\nThere's definitly some shit I need to deal with first.\n\nSo I'm going to take a break for now.");
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I know you'll be alone, but I promise I'll come back for you.");
            }
        } else if (this.stage == 3) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Thank you.");
            }
        } else if (this.stage == 4) {
            if (game.dialog) timer = new Date();
            else if (new Date() - timer > 1000) {
                R.lset(0);
                R.put("error", 200 - 20, 120 - 4, 22);
            }
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                game.nextScene = false;
                game.nextNPC = CreditsCat;
                blankRoom(game, false);
                game.nextRoom(true);
            }
        }
    }
}

function GiveUp(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Yeah, I give up.\n\n\n\nThis was a shitty idea to begin with.\n\n\nI don't know what's going to happen to you.\n\n\nBut I wish you well.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "Goodbye.");
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 2000 && !game.dialog) {
                game.scene = false;
                game.nextScene = false;
                game.nextNPC = false;
                blankRoom(game, false);
                game.nextRoom(true);
            }
        }
    }
}

function Deleted(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);

    let secondaryStage = 0;
    this.update = () => {
        if (this.stage == 0) {
            if (new Date() - timer > 1000) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I give up.\n\n\n\nThis was a shitty idea to begin with.\n\n\nI know you'll be stuck in limbo or something\n\n\nSo I'll delete the game instead.");
            }
        } else if (this.stage == 1) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 1000 && !game.dialog) {
                this.stage++;
                game.dialog = new Dialog(game, pfs, "I'm sorry.");
            }
        } else if (this.stage == 2) {
            if (game.dialog) timer = new Date();
            if (new Date() - timer > 0 && !game.dialog) {
                window.location.replace("http://sweaters.itch.io/badEnding");
                noLoop();
            }
        }
    }
}
