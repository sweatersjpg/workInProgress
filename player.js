

function Player(game, x, y) {
    Actor.call(this, game, x, y, 16, 8);
    this.inertia = 0.75;
    this.bounce = 0;

    let dir = false;
    let state;

    this.update = () => {
        this.move();
        this.checkForItem();

        // let dir = mouse.copy().add(-this.size.x / 2, -this.size.y / 2).sub(this.pos);
        // this.vel.set(dir.x, dir.y);
        let acc = 1;
        if (btn.down) this.vel.y += acc;
        if (btn.right) this.vel.x += acc;
        if (btn.up) this.vel.y -= acc;
        if (btn.left) this.vel.x -= acc;
    }

    this.draw = () => {
        if (this.vel.x > 1) dir = false;
        else if (this.vel.x < -1) dir = true;
        else if (this.vel.y > 1) dir = false;
        else if (this.vel.y < -1) dir = true;

        let frame = 16;

        let idle = false;
        if (abs(this.vel.x) > 1) state = "H";
        else if (abs(this.vel.y) > 1) state = "V";
        else idle = true;

        let frames = [0, 2, 4, 6];
        if (idle) {
            if (state == "H") frame = frames[floor(frameCount / 10) % frames.length] + 16;
            if (state == "V") frame = frames[floor(frameCount / 10) % frames.length] + 48;
        } else if (state == "H") {
            frame = frames[floor(frameCount / 4) % frames.length] + 24;
        } else if (state == "V") {
            frame = frames[floor(frameCount / 4) % frames.length] + 56;
        }

        R.lset(getLayer(this.pos.y + this.size.y));

        R.palset(22, 0);
        R.spr(frame, this.pos.x - 8, this.pos.y - 26, 2, 2, dir);

        this.debug();

        this.updateItem();
    }

    this.item = false;
    this.checkForItem = () => {
        if (this.item) {
            if (btn.b && !pbtn.b) this.dropItem();
            return;
        }

        if (!(btn.b && !pbtn.b)) return;

        let threshold = 32;
        let closest = false;
        for (a of game.actors) {
            if (this == a) continue;
            if (!a.isItem) continue;
            if (a.dist() > threshold) continue;
            if (!closest || closest.dist() > a.dist()) closest = a;
        }

        if (closest) this.pickUp(closest);
    }

    this.pickUp = (item) => {
        item.kill();
        this.item = item;
        this.updateItem();
    }

    this.dropItem = () => {
        game.actors.push(this.item);
        this.item.vel = this.vel.copy().mult(2);
        if (this.item.drop) this.item.drop();
        this.item = false;
    }

    this.updateItem = () => {
        if (!this.item) return;

        this.item.pos = this.pos.copy();
        this.item.pos.x += this.size.x - this.item.size.x;
        this.item.h = 26;

        this.item.draw(R.lset(getLayer(this.pos.y + this.size.y)));
    }
}