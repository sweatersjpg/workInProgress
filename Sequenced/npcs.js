

function NPC(game, x, y, w, h) {
    Actor.call(this, game, x, y, w, h);

    this.dialog = [];
    this.dIndex = 0;
    this.dBox = { pos: this.pos.copy(), size: this.size.copy() }

    this.update = () => {
        if (!game.dialog && collided(game.player.pos, game.player.size, this.dBox.pos, this.dBox.size)) {
            if (!(btn.a && !pbtn.a) || !this.dialog.length) return;
            game.dialog = this.dialog[this.dIndex];
            if (this.dIndex < this.dialog.length - 1) this.dIndex++;
        }
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