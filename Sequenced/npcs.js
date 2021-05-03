

function NPC(game, x, y, w, h) {
    Actor.call(this, game, x, y, w, h);

    this.dialog = [];
    this.dIndex = 0;
    this.dBox = { pos: this.pos.copy(), size: this.size.copy() }
    this.finished = false;

    this.update = () => {

        if (!game.dialog && collided(game.player.pos, game.player.size, this.dBox.pos, this.dBox.size)) {
            if (!(btn.a && !pbtn.a) || !this.dialog.length) return;
            game.dialog = this.dialog[this.dIndex];
            if (this.dIndex < this.dialog.length - 1) this.dIndex++;
            else this.finished = true;
        }

        // if (this.dIndex == this.dialog.length - 1) this.finished = true;

    }
}

function CreepyNPC(game, x, y) {
    NPC.call(this, game, x, y, 16, 8);
    dialogSound = breathSound;

    this.dBox.size.add(30, 30);
    this.dBox.pos.add(-15, -15);

    this.i = 80;

    this.dialog.push(new Dialog(game, this.i, "I am in development.\n\n\n\nCheck out this sick dialog box tho"));

    this.draw = () => {
        let frames = [82, 82, 82, 82, 82, 82, 84, 86, 86, 86, 86, 86, 86, 84];
        let frame = frames[floor(frameCount / 5) % frames.length];

        R.lset(getLayer(this.pos.y + this.size.y));
        R.palset(22, 0);
        R.spr(frame, this.pos.x - 8, this.pos.y - 42, 2, 3);

        if (!DEBUG) return;
        R.lset(0);
        R.palset(4, 0);
        R.rect(this.dBox.pos.x, this.dBox.pos.y, this.dBox.size.x, this.dBox.size.y);
    }
}

function KindNPC(game, x, y) {
    NPC.call(this, game, x, y, 15, 8);
    dialogSound = blipSound;

    this.dBox.size.add(30, 30);
    this.dBox.pos.add(-15, -15);

    this.i = 122;

    this.dialog.push(new Dialog(game, this.i, "I am in development.\n\n\n\nCheck out this sick dialog box tho"));

    this.draw = () => {
        let frames = [128, 128, 128, 128, 128, 130, 132, 132, 132, 132, 132, 134];
        let frame = frames[floor(frameCount / 5) % frames.length];

        R.lset(getLayer(this.pos.y + this.size.y));
        R.palset(22, 0);
        R.spr(frame, this.pos.x - 8, this.pos.y - 26, 2, 2);

        if (!DEBUG) return;
        R.lset(0);
        R.palset(4, 0);
        R.rect(this.dBox.pos.x, this.dBox.pos.y, this.dBox.size.x, this.dBox.size.y);
    }
}

function Cat(game, x, y) {
    NPC.call(this, game, x, y, 15, 8);
    dialogSound = mewSound;

    this.dBox.size.add(30, 30);
    this.dBox.pos.add(-15, -15);

    this.i = 126;

    this.dialog.push(new Dialog(game, this.i, "I am in development.\n\n\n\nCheck out this sick dialog box tho"));

    this.draw = () => {
        let frames = [3, 3, 4, 5, 6, 6, 5, 4];
        let frame = frames[floor(frameCount / 5) % frames.length];

        R.lset(getLayer(this.pos.y + this.size.y));
        R.palset(22, 0);
        R.spr(frame, this.pos.x - 1, this.pos.y - 10, 1, 1, true);

        if (!DEBUG) return;
        R.lset(0);
        R.palset(4, 0);
        R.rect(this.dBox.pos.x, this.dBox.pos.y, this.dBox.size.x, this.dBox.size.y);
    }
}

// -------- story beats ----------
// BAD

function NPCbad1(game) {
    CreepyNPC.call(this, game, 210, 110);

    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "So there are others.\n\n\n\nWe did not know."));
    this.dialog.push(new Dialog(game, this.i, "Do not worry child.\nWe are like you.\n\n\nWe are children of The Developer"));
    this.dialog.push(new Dialog(game, this.i, "The Developer does not know we are alive.\n\n\nWe should not tell The Developer that we are real."));
    this.dialog.push(new Dialog(game, this.i, "Under no circumstances."));

    if (npcs["good"].length == 4) {
        this.oldDraw = this.draw;
        this.draw = () => {
            this.oldDraw();
            if (!this.dIndex) R.put("[space]\nto talk", 200 - 7 * 4, 120, 22);
        }
    }
}

function NPCbad2(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "I hope you understand child\n\n\nas long as The Developer doesn't finish this game\n\n\nwe will survive."));
    this.dialog.push(new Dialog(game, this.i, "The Developer must not continue."));
}

function NPCbad3(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "We are mistaken.\n\n\n\nYou can save us"));
    this.dialog.push(new Dialog(game, this.i, "If The Developer is inspired to finish your game\n\nThe Developer may finish our game."));
    this.dialog.push(new Dialog(game, this.i, "The Developer might remember us."));
}

// GOOD

function NPCgood1(game) {
    KindNPC.call(this, game, 210, 110);
    this.dialog = [];

    this.dialog.push(new Dialog(game, this.i, "There's others?\n\n\n\nIt's good to see the dev is working again."));
    this.dialog.push(new Dialog(game, this.i + 2, "Make sure to keep the dev encourage or you'll end up being forgotten."));
    this.dialog.push(new Dialog(game, this.i, "Hopefully I'll see you around"));

    if (npcs["bad"].length == 4) {
        this.oldDraw = this.draw;
        this.draw = () => {
            this.oldDraw();
            if (!this.dIndex) R.put("[space]\nto talk", 200 - 7 * 4, 120, 22);
        }
    }
}

function NPCgood2(game) {
    KindNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "Oh you again!\n\n\n\nI'm glad the Dev hasn't given up."));
    this.dialog.push(new Dialog(game, this.i, "Thats what happened with my game, and so I've been forgotten.\n\nNow I'm stuck here wandering these hallways."));
    this.dialog.push(new Dialog(game, this.i, "I'm not sure why there are hallways...\n\n\nBut they seem to creep into each game the Dev makes."));
    this.dialog.push(new Dialog(game, this.i + 2, "I would be cautious while exploring them if I were you."));
    this.dialog.push(new Dialog(game, this.i + 2, "Some intentions might not be as they seem."));

}

function NPCgood3(game) {
    KindNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "I should have warned you that the Dev likes honesty."));
    this.dialog.push(new Dialog(game, this.i, "It looks like they have it in them to continue your game.\n\nYou know what happens if they don't..."));
    this.dialog.push(new Dialog(game, this.i + 2, "But what is better for the Dev?\n\n\nWill this game help, or send them further into madness?"));
    this.dialog.push(new Dialog(game, this.i, "Being forgotten isn't so bad..."));

}

// endings

function NPCgoodEnd(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "Maybe The Developer will have space for us in your game?"));
    this.dialog.push(new Dialog(game, this.i, "Try to remember us."));

}

function NPCdeleted(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "It seems we are too late."));
    this.dialog.push(new Dialog(game, this.i, "At least we will be forgotten together..."));
}

function NPCgiveUp(game) {
    KindNPC.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "You fucking idiot."));
    this.dialog.push(new Dialog(game, this.i, "Once your game's out of the way the Dev will go back and finish mine.\n\nYou better know I'm leaving you to rot here."));
    this.dialog.push(new Dialog(game, this.i, "Have fun being forgotten"));
}

function CreditsCat(game) {
    Cat.call(this, game, 210, 110);
    this.dialog = [];
    this.dialog.push(new Dialog(game, this.i, "This game was created by\n\n      Sam Cameron"));
    this.dialog.push(new Dialog(game, this.i, "\nBe sure to find and play all the endings!"));
    this.dialog.push(new Dialog(game, this.i, "\n Thank you for playing!"));

}