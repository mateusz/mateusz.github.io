window.onload = function() {	

	var game = new Phaser.Game(1120,512);
	// the player! The hero of the game!!
	var player = [];
	// level map, created with Tiled
	var map;
	// map layer with level data
	var levelLayer;
	// map tile size, in pixels
	var tileSize = 32;
	// tilePoint will be used to save the coordinates of the tile placed by the player
	var tilePoint = null;
	// is the player jumping?
	var playerJumping = [false,false,false,false];
	// playGame function, to be bound to "PlayGame" state
	var playGame = function(game){}

	playGame.prototype = {
		// preloading assets
		preload: function(){
			// map data
			game.load.tilemap("map", "marek2.json", null, Phaser.Tilemap.TILED_JSON);
			// rock image, used to draw walls
			game.load.image("rock", "rock.png");
			// block image, used to let the player add tiles to the map
			game.load.image("block", "block.png");
			// the player
			game.load.image("gracz 1", "gracz 1.png");
			game.load.image("gracz 2", "gracz 2.png");
			game.load.image("gracz 3", "gracz 3.png");
			game.load.image("gracz 4", "gracz 4.png");

		},
		// once the game has been created
		create: function(){
			// starting arcade physics
			game.physics.startSystem(Phaser.Physics.ARCADE);
			// adding the map
			map = game.add.tilemap("map");
			// adding "rock" and "block" graphic assets to the map
			map.addTilesetImage("rock");
			map.addTilesetImage("block");
			// both "rock" and "block" are solid
			map.setCollisionBetween(1,2);

			// we are going to use "myLevel" layer, as created with Tiled
			levelLayer = map.createLayer("myLevel");
			// adding the playeroom
			for(i=0;i<=3;i=i+1) {
				player[i] = game.add.sprite(48,226,"gracz " + (i+1));
				// setting player registration point in the center
				player[i].anchor.setTo(0.5);
				// enabli5);ng arcade pysics to the player
				game.physics.enable(player[i], Phaser.Physics.ARCADE);
				// setting player gravity
				player[i].body.gravity.y = 400;
			}

			// function to be executed at each frame
		},
		update:function(){

			game.physics.arcade.collide(player[0], player[1]);
			game.physics.arcade.collide(player[0], player[2]);
			game.physics.arcade.collide(player[0], player[3]);
			game.physics.arcade.collide(player[1], player[2]);
			game.physics.arcade.collide(player[1], player[3]);
			game.physics.arcade.collide(player[2], player[3]);

			for(i=0;i<=3;i=i+1) {
				// setting player x speed to zero
				player[i].body.velocity.x = 0;
				// check for collision between the player and the level, and call "movePlayer" if there's a collision
				game.physics.arcade.collide(player[i], levelLayer);

				if(player[i].body.blocked.down) {
					playerJumping[i]=false;
				}

				if(player[i].y>460) {
					player[i].x=48;
					player[i].y=226;
				}	
			}

			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				player[0].body.velocity.x =-300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.F)) {
				player[2].body.velocity.x =-300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.J)) {
				player[3].body.velocity.x =-300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
				player[1].body.velocity.x=-300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				player[0].body.velocity.x=+300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.H)) {
				player[2].body.velocity.x=+300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.L)) {
				player[3].body.velocity.x=+300;
			}
			if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
				player[1].body.velocity.x=+300;
			}
			if ( ! playerJumping[0]) {
				if  (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
					player[0].body.velocity.y=-225;
					playerJumping[0]=true;
				}
			}
			if ( ! playerJumping[2]) {
				if  (game.input.keyboard.isDown(Phaser.Keyboard.T)){
					player[2].body.velocity.y=-225;
					playerJumping[2]=true;
				}
			}
			if ( ! playerJumping[3]) {
				if  (game.input.keyboard.isDown(Phaser.Keyboard.I)){
					player[3].body.velocity.y=-225;
					playerJumping[3]=true;
				}
			}
			if ( ! playerJumping[1]) {
				if  (game.input.keyboard.isDown(Phaser.Keyboard.W)){
					player[1].body.velocity.y=-225;
					playerJumping[1]=true;
				}
			}

		}
	}

	// defining "PlayGame" state
	game.state.add("PlayGame",playGame);
	// run "PlayGame" state
	game.state.start("PlayGame");
}
