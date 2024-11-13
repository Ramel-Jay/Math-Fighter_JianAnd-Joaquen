import Phaser from "phaser";

export default class MathFighterScene extends Phaser.Scene{
    constructor(){
        super("math-fighter-scene")
    }

    init(){
        this.gameHalfWidth = this.scale.width * 0.5;
        this.gameHalfHeight = this.scale.height * 0.5;

        this.player = undefined;
        this.enemy = undefined;
        this.slash = undefined;

        this.startGame = false;
        this.questionText = undefined;
        this.resultText = undefined;

        this.button1 = undefined;
        this.button2 = undefined;
        this.button3 = undefined;
        this.button4 = undefined;
        this.button5 = undefined;
        this.button6 = undefined;
        this.button7 = undefined;
        this.button8 = undefined;
        this.button9 = undefined;
        this.button0 = undefined;
        this.buttonDel = undefined;
        this.buttonOk = undefined;

    }

    preload(){
        this.load.image("background", "/Images/bg_layer1.png")
        this.load.image("fight-bg", "/Images/fight-bg.png")
        this.load.image("tile", "/Images/tile.png")
        this.load.image("btn-start", "/Images/start_button.png")

        this.load.spritesheet("player", "/Images/warrior1.png", {
            frameWidth: 80,
            frameHeight: 80
        })

        this.load.spritesheet("enemy", "/Images/warrior2.png", {
            frameWidth: 80,
            frameHeight: 80
        })

        this.load.spritesheet("numbers", "/Images/numbers.png", {
            frameWidth: 71.25,
            frameHeight: 131
        })

        this.load.spritesheet("slash", "/Images/slash.png", {
            frameWidth: 88,
            frameHeight: 42
        })

    }

    create(){
        // Display sprites
        this.add.image(240, 320, "background");
        
        const fight_bg = this.add.image(240, 160, "fight-bg")

        const tile = this.physics.add.staticImage(240, fight_bg.height - 40, "tile")

        this.player = this.physics.add.sprite(this.gameHalfWidth - 140, this.gameHalfHeight - 200, "player").setBounce(0.4).setOffset(-20, -10)
        this.physics.add.collider(this.player, tile)

        this.enemy = this.physics.add.sprite(this.gameHalfWidth + 140, this.gameHalfHeight - 200, "enemy").setBounce(0.4).setOffset(20, -10).setFlipX(true)
        this.physics.add.collider(this.enemy, tile)

        this.slash = this.physics.add.sprite(240,60, "slash").setActive(false).setVisible(true).setGravityY(-500).setOffset(0, -10).setDepth(1).setCollideWorldBounds(true)
        let start_button = this.add.image(this.gameHalfWidth, this.gameHalfHeight + 181, "btn-start").setInteractive();

        this.createAnimation();

        start_button.on("pointerdown",() => { 
            this.gameStart();
            start_button.destroy();
        }, this);

        this.createButtons();
    }

    createAnimation(){
        this.anims.create({
            key: 'player-standby',
            frames: this.anims.generateFrameNumbers("player", {start: 15, end: 19}),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'player-attack',
            frames: this.anims.generateFrameNumbers('player', { start: 10, end: 14 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'player-hit',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 9 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'player-die',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 10
        });
    }

    gameStart() {
        this.startGame = true;
        this.player.anims.play('player-standby', true);
        this.enemy.anims.play('enemy-standby', true);
        this.resultText = this.add.text(this.gameHalfWidth, 200, '0', { 
            fontSize: '32px', 
            fill: '#000' 
        });
        this.questionText = this.add.text(this.gameHalfWidth, 100, '0', { 
            fontSize: '32px', 
            fill: '#000' 
        });
    }

    createButtons() {
        const startPosY = this.scale.height - 246;
        const widthDiff = 131;
        const heightDiff = 71.25;
      
        // center buttons
        this.button2 = this.add.image(this.gameHalfWidth, startPosY, 'numbers', 1)
          .setInteractive()
          .setData('value', 2);
      
        this.button5 = this.add.image(this.gameHalfWidth, this.button2.y + heightDiff, 'numbers', 4)
          .setInteractive()
          .setData('value', 5);
      
        this.button8 = this.add.image(this.gameHalfWidth, this.button5.y + heightDiff, 'numbers', 7)
          .setInteractive()
          .setData('value', 8);
      
        this.button0 = this.add.image(this.gameHalfWidth, this.button8.y + heightDiff, 'numbers', 10)
          .setInteractive()
          .setData('value', 0);
      }

    update(){

    }
}