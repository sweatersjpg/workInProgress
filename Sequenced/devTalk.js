
function Button(game, x, y, playerOnly) {
    Actor.call(this, game, x, y, 30, 24);

    this.notSolid = true;
    this.active = false;

    this.update = () => {
        if (playerOnly) this.active = collided(this.pos, this.size, game.player.pos, game.player.size);
        if (playerOnly) return;

        let contact = false;
        for (let a of game.actors) {
            if (a == this || a.visual) continue;
            if (collided(this.pos, this.size, a.pos, a.size)) {
                if (a.isItem && a.h > 8) continue;
                contact = a;
                break;
            }
        }
        this.active = contact;
    }

    this.draw = () => {
        R.lset(getLayer(this.pos.y));

        R.palset(22, 0);
        let f = 88;
        if (this.active) f = 120;
        R.spr(f, this.pos.x - 1, this.pos.y - 2, 2, 2);
    }
}

function Choice(game, op1, op2) {

}

function intro(game) {
    this.stage = 0;
    let timer = new Date();

    blankRoom(game);
    new Button(game, 240, 160, false);


    this.update = () => {

    }
}