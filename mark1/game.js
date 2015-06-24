window.onload = function() {	
     
     // the game itself
	var game = new Phaser.Game(1120,512);
	// the player! The hero of the game!!
     var player1;
     var player2;
     // level map, created with Tiled
	var map;
     // map layer with level data
	var levelLayer;
     // player horizontal speed
	var player1Speed = 120;
	var player2Speed = 120;
     // map tile size, in pixels
	var tileSize = 32;
     // tilePoint will be used to save the coordinates of the tile placed by the player
	var tilePoint = null;
     // is the player jumping?
	var player1Jumping = false	;
    var player2Jumping = false	;
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
               // adding the player
			player1 = game.add.sprite(48,226,"gracz 1");	
			player2 = game.add.sprite(80,226,"gracz 2");
			// setting player registration point in the center
            player1.anchor.setTo(0.5);
           	player2.anchor.setTo(0.5);
            // enabli5);ng arcade pysics to the player
			game.physics.enable(player1, Phaser.Physics.ARCADE);
			game.physics.enable(player2, Phaser.Physics.ARCADE);
               // setting player gravity
			player1.body.gravity.y = 400;
			player2.body.gravity.y = 400;

          // function to be executed at each frame
      },
		update:function(){
               // setting player x speed to zero
			player1.body.velocity.x = 0;
			player2.body.velocity.x = 0;
               // check for collision between the player and the level, and call "movePlayer" if there's a collision
			game.physics.arcade.collide(player1, levelLayer);
			game.physics.arcade.collide(player2, levelLayer);

			game.physics.arcade.collide(player1, player2);
			
			if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			player1.body.velocity.x =-300;
    		}
			if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			player2.body.velocity.x=-300;
    		}
    		 if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			player1.body.velocity.x=+300;
    		}
			 if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			player2.body.velocity.x=+300;
    		}
			if ( ! player1Jumping)
			if  (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
				player1.body.velocity.y=-215;
				player1Jumping=true;
			}
			if ( ! player2Jumping)
			if  (game.input.keyboard.isDown(Phaser.Keyboard.W)){
				player2.body.velocity.y=-215;
				player2Jumping=true;
			 }
			if(player1.body.blocked.down) {
				player1Jumping=false;
			}

			if(player2.body.blocked.down){
				 player2Jumping=false;
			 }

				if(player1.y>460) {
				player1.x=48;
				player1.y=226;}	

				if(player2.y>460) {
				player2.x=48;
				player2.y=226;}	
		}
	}
		
     // defining "PlayGame" state
	game.state.add("PlayGame",playGame);
     // run "PlayGame" state
	game.state.start("PlayGame");
}