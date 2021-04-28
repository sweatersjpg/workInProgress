let dialogSound;

function Dialog(game, icon, lines) {

    this.currentLine = lines

    this.width = 25; // 25 characters across
    this.height = 4; // 4 characters high

    this.currentLine = formatLine(this.currentLine, this.width);

    this.pos = new Vector(200 - 20 * 4 - 4, 240 - this.height * 8 - 16);

    this.t = 0;
    this.text = "";
    this.waiting = false;

    let textSpeed = 0.5;

    let f = icon;
    if (icon.length) f = random(icon);

    let pt = -1;

    this.draw = () => {
        let nLines = (this.text.match(/\n/g) || []).length;

        if (this.t < this.currentLine.length && nLines < this.height) {
            if (floor(this.t) != floor(pt)) {
                this.text += this.currentLine[floor(this.t)];
                if (!"\n ".includes(this.currentLine[floor(this.t)])) {
                    if (dialogSound /*&& this.t % 2 == 0*/)
                        dialogSound.play(0, random(0.7, 1), random(0.2, 1));
                } else if (" ".includes(this.currentLine[floor(this.t)]) && dialogSound == keySound) {
                    dialogSound.play(0, random(0.65, 0.7), random(0.8, 1));
                }
            }
            pt = this.t;
            this.t += textSpeed;
            if (dialogSound == keySound) this.t -= random(0, 0.2);

            if (this.t > 1 && btn.a && !pbtn.a) {
                while (this.t < this.currentLine.length && nLines < this.height) {
                    nLines = (this.text.match(/\n/g) || []).length;
                    if (floor(this.t) != floor(pt)) this.text += this.currentLine[floor(this.t)];
                    pt = this.t;
                    this.t += textSpeed;
                }
            }
            if (icon.length && frameCount % 4 == 0) f = random(icon);

        } else {

            R.lset(124);
            R.palset(22, 0);
            let y = 3 - 1.5 * sin(frameCount / 5);
            R.spr([1], this.pos.x + this.width * 8 - 8, this.pos.y + this.height * 8 - 10 + y);

            if (btn.a && !pbtn.a) {
                this.text = "";
                if (this.t >= this.currentLine.length) {
                    game.dialog = false;
                    this.t = 0;
                }
            }
        }
        R.lset(123);

        if (game.goodDialogBoxes) {
            R.palset(0);
            R.fillRect(this.pos.x - 4 - 32, this.pos.y - 4, this.width * 8 + 8 + 32, this.height * 9 + 6);
            R.palset(22);
            R.rect(this.pos.x - 4 - 32, this.pos.y - 4, this.width * 8 + 8 + 32, this.height * 9 + 6);

            R.palset(22, 0);
            R.spr(f, this.pos.x - 33, this.pos.y, 2, 2);
        }

        R.put(this.text, this.pos.x, this.pos.y, 22);

    }
}

function formatLine(text, width) {
    let lastSpace = 0;

    let charCount = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] == ' ') lastSpace = i;
        charCount++;

        if (charCount > width) {
            let chars = text.split(''); chars[lastSpace] = "\n"; text = chars.join('');
            i = lastSpace;
        }

        if (text[i] == '\n') charCount = 0;
    }

    return text;
}