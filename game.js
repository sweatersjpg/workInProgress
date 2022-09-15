
let DEBUG = false;
let SOUND = true;

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
let mewSound;
let music;

function preload() {
    // if (!SOUND) return;
    soundFormats('wav');
    let sf = ".wav";

    keySound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/key' + sf);
    blipSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/blip' + sf);
    breathSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/breath' + sf);
    mewSound = loadSound("https://sweatersjpg.github.io/workInProgress/Assets/Sound/mew" + sf)

    plantSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/plant' + sf);
    buttonDownSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/buttonDown' + sf);
    buttonUpSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/buttonUp' + sf);
    footstepSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/footstep' + sf);
    ballSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/ball' + sf);
    splishSound = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/splish' + sf);

    music = loadSound('https://sweatersjpg.github.io/workInProgress/Assets/Sound/ambient' + sf);
}

function init() {
    main = new Title();
    // main = new Game();

    dialogSound = keySound;
}

function Title() {
    this.actors = [];
    this.walls = [];
    this.player = { item: false };
    let p = new Pot(this, 200 - 8, 174);
    p.vel = new Vector();
    p.makeGrown();

    this.draw = () => {
        this.actors[0].update();
        this.actors[0].draw();

        R.palset(22, 0);

        let w = 23 * 8;
        let h = 9 * 8;
        let x = 200 - w / 2;
        let y = 120 - h + 8 * sin(frameCount / 25);

        R.spr([152], x, y, 23, 9, false, 0, w, h);

        let pal = [22, 37, 38, 39, 40, 41, 42, 30, 0];
        let c = 4.5 + 4.5 * sin(frameCount / 10);

        R.put("PRESS ANY KEY TO ENTER", 200 - 22 * 4, 220, pal[floor(c)]);

        if (keyIsPressed) {
            main = new Game();
        }
    }
}

function Game() {
    if (music.isPlaying()) music.stop();

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
    if (SOUND) music.loop();

    // test area
    // blankRoom(this);
    // new CreditsCat(this, 250, 150);
    // this.scene = new Deleted(this);
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
        if (music.isPlaying()) music.stop();
        this.walls = [];
        if (!this.NPC) this.actors = [this.player]; // reset actors (except for player)
        else this.actors = [this.player, this.NPC];

        if (random() < 0.25 && !noNPC && !this.NPC && this.nextNPC) this.NPC = new this.nextNPC(this);

        if (this.NPC && this.NPC.finished) {
            this.NPC = false;
            if (this.nextScene) {
                dialogSound = keySound;
                this.scene = new this.nextScene(this);
                if (SOUND) music.loop();
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
