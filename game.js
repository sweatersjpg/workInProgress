
let DEBUG = false;

let scenes;

let npcs;

function init() {
    main = new Game();

    scenes = {
        bad: [DevTalkbad1],
        good: []
    }

    npcs = {
        bad: [NPCbad1],
        good: []
    }
}

function Game() {
    this.goodDialogBoxes = true;

    this.walls = [];
    this.actors = [];
    this.particles = [];

    this.player = new Player(this, 200, 120);

    this.currentNPC = false;

    this.dialog = false;

    this.scene = new intro(this);
    this.nextScene = false;
    // this.scene.stage = 9;

    this.draw = () => {

        if (this.scene) this.scene.update();

        let p = this.player.pos.copy();
        if (p.x > 400) this.player.pos.x = 0;
        if (p.x + this.player.size.x < 0) this.player.pos.x = 400 - this.player.size.x;
        if (p.y - 20 > 240) this.player.pos.y = 20;
        if (p.y + this.player.size.y - 3 < 0) this.player.pos.y = 240 - this.player.size.y + 3;

        if (!this.player.pos.equals(p)) this.nextRoom();

        for (let a = this.actors.length - 1; a >= 0; a--) this.actors[a].update();
        for (let a = this.actors.length - 1; a >= 0; a--) this.actors[a].draw();
        for (let w = this.walls.length - 1; w >= 0; w--) this.walls[w].draw();

        if (this.dialog) this.dialog.draw();

        // if (btn.a && !pbtn.a) this.nextRoom();

        if (!this.scene) {
            let g = R.buffer[121];
            g.hasChanged = true;
            g.background(PAL[0]);
            g.erase();
            g.ellipse(main.player.pos.x + 8, main.player.pos.y - 8, 200, 200);
            g.noErase();
        }

    }

    let lastRoom = xRoom;
    this.nextRoom = (noNPC) => {
        if (this.currentNPC && this.currentNPC.finished) this.scene = new this.nextScene(game);

        this.walls = [];
        this.actors = [this.player]; // reset actors (accept for player)

        if (random() < 0.15 && !noNPC) new this.currentNPC(this);

        let dir = this.player.pos.copy().add(-200, -140);
        let angle = round((degrees(dir.heading()) + 180) / 90) * 90;

        let fns = [xRoom, tRoom, iRoom, lRoom];
        fns.splice(fns.indexOf(lastRoom), 1);
        lastRoom = random(fns);
        lastRoom(this, radians(angle));
        // lRoom(this, radians(angle));

    }
    // this.nextRoom();
    // blankRoom(this);

}

function xRoom(game, R) {
    let wvs = [];
    for (let i = 0; i < 4; i++) wvs.push(new Vector(180, 0).rotate(HALF_PI * i + QUARTER_PI + R).add(200, 140));
    for (let w of wvs) new Wall(game, w.x - 80, w.y - 80, 160, 160);
}

function tRoom(game, R) {
    R += random([0, HALF_PI, PI]);

    let wvs = [];
    wvs.push(new Vector(180, 0).rotate(QUARTER_PI + R).add(200, 140));
    wvs.push(new Vector(180, 0).rotate(HALF_PI + QUARTER_PI + R).add(200, 140));
    wvs.push(new Vector(287, 0).rotate(-HALF_PI + R).add(200, 140));
    new Wall(game, wvs[0].x - 80, wvs[0].y - 80, 160, 160);
    new Wall(game, wvs[1].x - 80, wvs[1].y - 80, 160, 160);
    new Wall(game, wvs[2].x - 240, wvs[2].y - 240, 480, 480);
}

function iRoom(game, R) {
    let wvs = [];
    wvs.push(new Vector(287, 0).rotate(-HALF_PI + R).add(200, 140));
    wvs.push(new Vector(287, 0).rotate(HALF_PI + R).add(200, 140));
    new Wall(game, wvs[0].x - 240, wvs[0].y - 240, 480, 480);
    new Wall(game, wvs[1].x - 240, wvs[1].y - 240, 480, 480);
}

function lRoom(game, R) {
    if (random() > 0.5) R += HALF_PI;

    let v = new Vector(180, 0).rotate(HALF_PI + QUARTER_PI + R).add(200, 140);
    new Wall(game, v.x - 80, v.y - 80, 160, 160);

    new InvertedWall(game, v.x - 175, v.y - 175, 350, 350);
}
