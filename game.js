
let DEBUG = false;

let scenes;

let npcs;

let keySound;
let blipSound;
let breathSound;
let plantSound;
let buttonDownSound;
let buttonUpSound;
let footstepSound;
let ballSound;
let splishSound;
// let music;

function preload() {
    soundFormats('wav');
    keySound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/key');
    blipSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/blip');
    breathSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/breath');

    plantSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/plant');
    buttonDownSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/buttonDown');
    buttonUpSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/buttonUp');
    footstepSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/footstep');
    ballSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/ball');
    splishSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/splish');


    // music = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/ambient');
}

function init() {
    main = new Game();

    dialogSound = keySound;
}

function Game() {
    scenes = {
        bad: [Deleted, DEVbad3, DEVbad2, DEVbad1],
        good: [GiveUp, DEVgood3, DEVgood2, DEVgood1]
    }

    npcs = {
        bad: [NPCdeleted, NPCbad3, NPCbad2, NPCbad1],
        good: [NPCgiveUp, NPCgood3, NPCgood2, NPCgood1]
    }

    this.goodDialogBoxes = true;

    this.walls = [];
    this.actors = [];
    this.particles = [];

    this.player = new Player(this, 200, 120);

    this.nextNPC = false;

    this.dialog = false;

    this.scene = new Intro(this);
    this.nextScene = Intro;

    // test area
    // blankRoom(this);
    // new CreditsCat(this, 250, 150);
    // this.scene = new DEVgood3(this);
    // ---------

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
        for (let a = this.actors.length - 1; a >= 0; a--) this.actors[a].debug();

        for (let w = this.walls.length - 1; w >= 0; w--) this.walls[w].draw();

        if (this.dialog) this.dialog.draw();

        if (!this.scene) {
            let g = R.buffer[121];
            g.hasChanged = true;
            g.background(PAL[0]);
            g.erase();
            g.ellipse(main.player.pos.x + 8, main.player.pos.y - 8, 200, 200);
            g.noErase();
        }

    }

    this.NPC = false;
    let lastRoom = xRoom;
    this.nextRoom = (noNPC) => {
        this.walls = [];
        if (!this.NPC) this.actors = [this.player]; // reset actors (except for player)
        else this.actors = [this.player, this.NPC];

        if (random() < 0.25 && !noNPC && !this.NPC && this.nextNPC) this.NPC = new this.nextNPC(this);

        if (this.NPC && this.NPC.finished) {
            this.NPC = false;
            if (this.nextScene) {
                dialogSound = keySound;
                this.scene = new this.nextScene(this);
                return;
            }
        }

        let dir = this.player.pos.copy().add(-200, -140);
        let angle = round((degrees(dir.heading()) + 180) / 90) * 90;

        let rooms = [xRoom, tRoom, iRoom, lRoom];
        rooms.splice(rooms.indexOf(lastRoom), 1);
        lastRoom = random(rooms);
        lastRoom(this, radians(angle));

    }

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
