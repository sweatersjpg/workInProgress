
function blankRoom(game, noItems) {
    game.actors = [];
    game.walls = [];

    game.player = new Player(game, 200 - 8, 140);

    new InvertedWall(game, 32, 64, 400 - 64, 240 - 64 - 8);

    if (noItems) return;
    new Ball(game, 260, 160);
    new Pot(game, 300, 140);

    // new CreepyNPC(game, 80, 80);

}

function Item(game, x, y, w, h) {
    Actor.call(this, game, x, y, w, h);
    this.notSolid = true;
    this.isItem = true;

    this.sound = ballSound;

    this.vel = new Vector(random(2, 6), 0).rotate(random(TAU));

    this.h = 32;
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

        if (this.h < 0.1 && abs(this.vh) >= 0.5) {
            this.sound.play(0, random(0.9, 1.1), abs(this.vh) / 4);
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

function Can(game, x, y) {
    Item.call(this, game, x, y, 15, 8);

    this.hb = 0.80;
    this.inertia = 0.90;

    let squish = 0;
    this.draw = (layer) => {
        if (squish > 0) squish /= 2;
        if (this.h < 0.1) squish = abs(this.vh);
        if (abs(this.vh) <= 1) squish = 0;

        R.lset(layer ?? getLayer(this.pos.y + this.size.y));

        R.palset(26, 3);
        R.spr(112, this.pos.x - squish / 2, this.pos.y - 10 - this.h + squish,
            1, 1, false, 0, 16 + squish, 16 - squish);

        this.debug();
    }
}

function Pot(game, x, y) {
    Item.call(this, game, x, y, 13, 8);
    this.sound = plantSound;

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

    this.isGrown = () => {
        return growth >= 7;
    }

}

function Button(game, x, y, text, playerOnly) {
    Actor.call(this, game, x - 15, y - 12, 30, 24);

    this.notSolid = true;
    this.active = false;

    let pressed;

    let timer = 0;
    this.update = () => {
        this.justActivated = false;
        let contact = false;
        if (playerOnly) contact = collided(this.pos, this.size, game.player.pos, game.player.size);
        else for (let a of game.actors) {
            if (a == this || a.visual) continue;
            if (collided(this.pos, this.size, a.pos, a.size)) {
                if (a.isItem && a.h > 8) continue;
                contact = a;
                break;
            }
        }

        this.active = contact;

        if (contact && !timer) {
            timer = 16;
        } else if (!contact) timer = 0;

        if (timer > 1) {
            timer--;
        } if (timer == 1) {
            timer = 0.5;
            buttonUpSound.play(0, random(0.9, 1.1));
            this.justActivated = true;
            this.activated = contact;
        }

        if (contact && !pressed) {
            pressed = true;
            buttonDownSound.play(0, random(0.9, 1.1));
        } else if (pressed && !contact) {
            pressed = false;
            buttonUpSound.play(0, random(0.9, 1.1));
        }

    }

    this.draw = () => {
        R.lset(getLayer(this.pos.y));

        R.palset(22, 0);
        if (timer && timer % 4 >= 2) R.palset(0, 0);
        let f = 88;
        if (this.active) f = 120;
        R.spr(f, this.pos.x - 1, this.pos.y - 2, 2, 2);

        R.put(text, this.pos.x + 15 - text.length * 4, this.pos.y - 12, 22);
    }
}

function Choice(game, spacing, ...choices) {

    this.btns = [];

    for (let i = 0; i < choices.length; i++) {
        let x = i * spacing + 200 - spacing * (choices.length - 1) / 2;
        this.btns.push(new Button(game, x, 95, choices[i], false));
    }

    this.answer = () => {
        let answer = false;
        for (let b of this.btns) if (b.activated) answer = this.btns.indexOf(b) + 1;
        return answer;
    }

    this.kill = () => {
        for (b of this.btns) b.kill();
        return false;
    }
}