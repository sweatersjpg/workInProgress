
function blankRoom(game) {
    game.actors = [];
    game.walls = [];

    game.player = new Player(game, 200, 120);

    new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);

    new Ball(game, 200, 120);
    new Pot(game, 210, 110);

    new CreepyNPC(game, 80, 80);

}

function Item(game, x, y, w, h) {
    Actor.call(this, game, x, y, w, h);
    this.notSolid = true;
    this.isItem = true;

    this.h = 0;
    this.hb = 0.5;
    this.vh = 0;

    this.dist = () => {
        return this.pos.dist(game.player.pos);
    }

    this.makeBounce = () => {
        this.vh -= 1;
        this.h += this.vh;
        if (this.h < 0) {
            this.h = 0;
            this.vh *= -this.hb;
        }
    }

    this.update = () => {
        this.move();
        this.makeBounce();
    }

    this.draw = (layer) => {
        R.lset(layer ?? getLayer(this.pos.y + this.size.y));

        this.debug();
    }
}

function Ball(game, x, y) {
    Item.call(this, game, x, y, 15, 8);

    this.bounce = 1;
    this.hb = 0.9;
    this.inertia = 0.95;

    this.drop = () => {
        this.vel = game.player.vel.copy().mult(5);
    }

    let squish = 0;
    this.draw = (layer) => {
        if (squish > 0) squish /= 2;
        if (this.h < 0.1) squish = abs(this.vh);
        if (abs(this.vh) <= 1) squish = 0;

        R.lset(layer ?? getLayer(this.pos.y + this.size.y));

        R.palset(26, 3);
        R.spr(2, this.pos.x - squish / 2, this.pos.y - 10 - this.h + squish,
            1, 1, false, 0, 16 + squish, 16 - squish);

        this.debug();
    }
}

function Pot(game, x, y) {
    Item.call(this, game, x, y, 13, 8);

    this.inertia = 0.85;

    this.drop = () => {
        this.vel = game.player.vel.copy().mult(4);
    }

    let growth = 0.90;
    let wave = 0;

    let squish = 0;
    this.draw = (layer) => {

        if (squish > 0) squish /= 2;
        if (this.h < 0.1) squish = abs(this.vh);
        if (abs(this.vh) <= 1) squish = 0;

        if (growth < 7 && game.player.item == this) growth += 0.01;
        if (growth >= 7) wave = 2 * sin(frameCount / 10);

        R.lset(layer ?? getLayer(this.pos.y + this.size.y));

        R.palset(46, 43);

        R.spr(7, this.pos.x - squish / 2, this.pos.y - 8 - this.h + squish,
            1, 1, false, 0, 16 + squish, 16 - squish);

        R.palset(55, 15);
        R.spr(8 + floor(growth), this.pos.x - squish / 2 - wave / 2, this.pos.y - 16 - this.h + squish * 2 + wave,
            1, 1, false, 0, 16 + squish + wave, 16 - squish - wave);

        this.debug();
    }

}