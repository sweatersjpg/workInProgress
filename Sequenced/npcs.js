

function NPC(game, x, y, w, h) {
    Actor.call(this, game, x, y, w, h);

    this.dialog = [];
    this.dIndex = 0;
    this.dBox = { pos: this.pos.copy(), size: this.size.copy() }
    this.finished = false;

    this.update = () => {
        if (!game.dialog && collided(game.player.pos, game.player.size, this.dBox.pos, this.dBox.size)) {
            if (!(btn.b && !pbtn.b) || !this.dialog.length) return;
            game.dialog = this.dialog[this.dIndex];
            if (this.dIndex < this.dialog.length - 1) this.dIndex++;
        }

        if (this.dIndex == this.dialog.length - 1) this.finished = true;
    }
}

function CreepyNPC(game, x, y) {
    NPC.call(this, game, x, y, 16, 8);

    this.dBox.size.add(20, 20);
    this.dBox.pos.add(-10, -10);

    this.dialog.push(new Dialog(game, 80, "I am in development.\n\n\n\nCheck out this sick dialog box tho"));

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
    NPC.call(this, game, x, y, 16, 8);

    this.dBox.size.add(20, 20);
    this.dBox.pos.add(-10, -10);

    this.dialog.push(new Dialog(game, 80, "I am in development.\n\n\n\nCheck out this sick dialog box tho"));

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

// -------- story beats ----------
// BAD

function NPCbad1(game) {
    CreepyNPC.call(this, game, 210, 110);

    this.dialog = [];
    this.dialog.push(new Dialog(game, 80, "So there are others.\n\n\n\nWe did not know."));
    this.dialog.push(new Dialog(game, 80, `Do not worry child.\nWe are like you.\n\n
We are children of The Developer`));
    this.dialog.push(new Dialog(game, 80, `The Developer does not know we are alive\n\n
Under no circumstances should we tell The Developer that we are real.`));
    this.dialog.push(new Dialog(game, 80, `Under no circumstances.`));

}

function NPCbad2(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
}

function NPCbad3(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
}

// GOOD

function NPCgood1(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
}

function NPCgood1(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
}

function NPCgood1(game) {
    CreepyNPC.call(this, game, 210, 110);
    this.dialog = [];
}