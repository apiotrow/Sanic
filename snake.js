window.onload = function() {
	//$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var poison = new Boolean();
	var bonus = new Boolean();
	var speed = new Boolean();
	var chaos = new Boolean();
	var elapsed = -1;
	var timehold;
	var speeding = new Boolean();
	var ss = new Boolean();

	var cw = 45;
	//25, 30, 45 works
	var d;
	var food;
	var score;
	var highestScore = 0;
	var poisonthing;
	var bonusthing;
	var speedthing;
	var chaosthing;

	bonus = false;
	speed = false;
	poison = false;
	chaos = false;

	var seconds = new Date().getTime() / 1000;

	var interval = 150;
	var scoreChange = new Boolean();

	var music;
	music = document.getElementById("yes");
	music.volume = 0.5;

	var righturl = 'sanicsright.png';
	var upurl = 'sanicsup.png';
	var downurl = 'sanicsdown.png';
	var lefturl = 'sanicsleft.png';
	
	var ssrighturl = 'ssright.png';
	var ssupurl = 'ssup.png';
	var ssdownurl = 'ssdown.png';
	var sslefturl = 'ssleft.png';
	
	var foodurl = 'ring.png';
	var poisonurl = 'spike.png';
	var bonusurl = 'chili.jpg';
	var speedurl = 'speed.png';
	var chaosurl = 'chaos.png';

	var soundEfx;
	// Sound Efx
	//var soundLoad = "over.wav"; //Game Over sound efx

	var snake_array;

	var resource = {};
	function load(key, url, callback) {

		if (resource[key]) {
			callback(resource[key]);
			return;
		} else {
			var img = new Image();
			img.onload = function() {
				resource[key] = img;
				callback(resource[key]);
			};
			resource[key] = false;
			img.src = url;
		}
	}

	function init() {
		d = "right";
		//default direction
		create_snake();
		create_food();
		score = 0;
		//soundEfx = document.getElementById("ring");

		var newseconds = new Date().getTime() / 1000;
		newseconds = newseconds - seconds;

		if ( typeof game_loop != "undefined")
			clearInterval(game_loop);
		
		ss = false;
		speeding = false;
		//clearInterval(game_loop);
		game_loop = setInterval(paint, 150);
		//game_loop = setTimeout( paint, interval );
		//game_loop = setTimeout(paint, 4000);

	}

	init();

	function create_snake() {
		var length = 6;
		//Length of the snake
		snake_array = [];
		//Empty array to start with
		for (var i = length - 1; i >= 0; i--) {
			snake_array.push({
				x : i,
				y : 2,
				dir : 'right'
			});
		}
	}

	function create_food() {
		var t = Math.round(Math.random() * 15) + 1;

		if (t == 1 || t == 2 || t == 3 || t == 4 || t == 5)
			poison = true;
		else
			poison = false;

		if (t == 6 || t == 7 || t == 8)
			bonus = true;
		else
			bonus = false;

		if (t == 9)
			speed = true;
		else
			speed = false;
			
		if (t == 10)
			chaos = true;
		else
			chaos = false;


		/*
		if (t == 1) speed = true;
		else if (t == 2) speed = true;
		else if (t == 3) speed = true;
		*/

		/*
		if (t == 1){
		speed = true;
		}else{
		speed = false;
		}

		if (t == 2){
		speed = true;
		}else{
		speed = false;
		}

		if (t == 3){
		speed = true;
		}else{
		speed = false;
		}
		*/

		//console.log(t);
		//console.log("speed: " + speed + ", bonus: " + bonus + ", poison: " + poison);

		if (poison == true) {
			poisonthing = {
				x : Math.round(Math.random() * (w - cw) / cw),
				y : Math.round(Math.random() * (h - cw) / cw),
			};
			if (poisonthing.y < 2)
				poisonthing.y = 2;
		} else if (bonus == true) {
			bonusthing = {
				x : Math.round(Math.random() * (w - cw) / cw),
				y : Math.round(Math.random() * (h - cw) / cw),
			};
			if (bonusthing.y < 2)
				bonusthing.y = 2;
		} else if (speed == true) {
			speedthing = {
				x : Math.round(Math.random() * (w - cw) / cw),
				y : Math.round(Math.random() * (h - cw) / cw),
			};
			if (speedthing.y < 2)
				speedthing.y = 2;
		} else if (chaos == true) {
			chaosthing = {
				x : Math.round(Math.random() * (w - cw) / cw),
				y : Math.round(Math.random() * (h - cw) / cw),
			};
			if (chaosthing.y < 2)
				chaosthing.y = 2;
		}

		food = {
			x : Math.round(Math.random() * (w - cw) / cw),
			y : Math.round(Math.random() * (h - cw) / cw),
		};

		if (food.y < 2)
			food.y = 2;

	}

	function paint() {

		//console.log(newseconds);
		//ctx.fillText(newseconds,100,100);
		//ctx.fillText("GOTTA", 100, 100);

		//console.log(butts8);

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		var nx = snake_array[0].x;
		var ny = snake_array[0].y;

		if (d == "right")
			nx++;
		else if (d == "left")
			nx--;
		else if (d == "up")
			ny--;
		else if (d == "down")
			ny++;

		//console.log(ny);
		//if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		
	

		if (ss == false) {
			if (nx == -1 || nx == w / cw || ny < 2 || ny == h / cw || check_collision(nx, ny, snake_array)) {
				init();
				return;
			}
		} else {
			if (nx == -1 || nx == w / cw || ny < 2 || ny == h / cw) {
				init();
				return;
			}
		}

		
		ctx.fillStyle = "red";
		ctx.font = "90px Comic Sans MS";

		var randx = Math.round(Math.random() * (w - 150));
		var randy = Math.round(Math.random() * h);
		if (randy < 180)
			randy = 180;

		ctx.fillText("GOTTA", randx, randy);

		randx = Math.round(Math.random() * (w - 10));
		randy = Math.round(Math.random() * h);
		if (randy < 200)
			randy = 200;
		ctx.fillText("GO", randx, randy);

		randx = Math.round(Math.random() * (w - 120));
		randy = Math.round(Math.random() * h);
		if (randy < 200)
			randy = 200;
		//console.log(randy);
		ctx.fillText("FAST", randx, randy);

		//console.log(localStorage.highest);

		/*
		 ctx.font="15px Verdana";
		 ctx.fillStyle = "black";
		 ctx.fillText("YOUR HIGHEST SCORE: " + localStorage.highest,80,40);
		 */

		if (poison == true && nx == poisonthing.x && ny == poisonthing.y) {
			//game_loop = clearTimeout(timeoutVariable)
			
			if (ss == false) {
				score--;
				soundEfx = document.getElementById("bumper");
				soundEfx.play();
				clearInterval(game_loop);
				game_loop = setInterval(paint, 150);
			}

			speeding = false;
			poison = false;
			create_food();
		}

		if (speed == true && nx == speedthing.x && ny == speedthing.y) {
			speeding = true;
			//speedOver = false;
			//console.log("running");
			soundEfx = document.getElementById("spin");

			soundEfx.play();

			clearInterval(game_loop);
			game_loop = setInterval(paint, 80);
			//}
			//interval = 80;
			create_food();
		}

		if (bonus == true && nx == bonusthing.x && ny == bonusthing.y) {
			score++;
			score++;
			if (speeding == true) {
				score++;
				score++;
			}
			if (score > highestScore) {
				highestScore = score;
				scoreChange = true;
			}
			soundEfx = document.getElementById("burp");
			soundEfx.play();
			bonus = false;
			create_food();
		}
		
		if (chaos == true && nx == chaosthing.x && ny == chaosthing.y) {
			ss = true;
			//invincble or something
			
			soundEfx = document.getElementById("ss");
			soundEfx.play();
			
			chaos = false;
			create_food();
		}

		if (nx == food.x && ny == food.y) {
			var tail = {
				x : nx,
				y : ny
			};
			score++;
			if (speeding == true) {
				score++;
			}
			if (score > highestScore) {
				highestScore = score;
				scoreChange = true;
			}
			soundEfx = document.getElementById("ring");
			soundEfx.play();
			create_food();
		} else {
			var tail = snake_array.pop();
			//pops out the last cell
			tail.x = nx;
			tail.y = ny;
		}

		//puts back the tail as the first cell
		snake_array.unshift(tail);

		for (var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}

		if (poison == true) {
			paint_food(food.x, food.y, poisonthing.x, poisonthing.y);
		}else if (bonus == true){
			paint_food(food.x, food.y, bonusthing.x, bonusthing.y);
		}else if (speed == true) {
			paint_food(food.x, food.y, speedthing.x, speedthing.y);
		}else if (chaos == true) {
			paint_food(food.x, food.y, chaosthing.x, chaosthing.y);
		} else
			paint_food(food.x, food.y);

		var score_text = "SCORE: " + score;
		ctx.font = "italic 30px Verdana";
		ctx.fillStyle = "blue";
		ctx.fillText(score_text, 20, 30);

		localStorage.highest = highestScore;
		ctx.font = "italic 30px Verdana";
		ctx.fillStyle = "blue";
		ctx.fillText("HIGH SCORE: " + localStorage.highest, 20, 60);

		ctx.fillStyle = "black";
		ctx.fillRect(0, cw * 2, w, 2);

		
		
		ctx.font = "italic 20px Verdana";
		ctx.fillStyle = "blue";
		
		var multi = .5;
		var horiz =  20;
		
		load('butts10', poisonurl, function(img) {
			ctx.drawImage(img, w - 110 - horiz, 0, cw * multi, cw * multi);
		});
		ctx.fillText("=-1pt", w - 80 - horiz, 20);
		
		load('butts9', foodurl, function(img) {
			ctx.drawImage(img, w - 110 - horiz, 30, cw * multi, cw * multi);
		});
		ctx.fillText("=+1pt", w - 80 - horiz, 50);
		
		load('butts1yu', chaosurl, function(img) {
			ctx.drawImage(img, w - 220 - horiz, 0, cw * multi, cw * multi);
		});
		ctx.fillText("=???", w - 190 - horiz, 20);
		
		load('butts1yfu', bonusurl, function(img) {
			ctx.drawImage(img, w - 220 - horiz, 30, cw * multi, cw * multi);
		});
		ctx.fillText("=+2pts", w - 190 - horiz, 50);
		
		load('butts1yfeu', speedurl, function(img) {
			ctx.drawImage(img, w - 220 - horiz, 60, cw * multi, cw * multi);
		});
		ctx.fillText("=C'MON STEP IT UP!", w - 200 - horiz, 80);


		console.log("speeding: " + speeding);
		if (speeding == true)
			speed_text();
		if (ss == true)
			ss_text();
			

	}

	function paint_food(x, y, px, py) {
		if (poison == true) {
			load('butts6', poisonurl, function(img) {
				ctx.drawImage(img, px * cw, py * cw, cw, cw);
			});
		} else if (bonus == true) {
			load('butts7', bonusurl, function(img) {
				ctx.drawImage(img, px * cw, py * cw, cw, cw);
			});
		} else if (speed == true) {
			load('buf', speedurl, function(img) {
				ctx.drawImage(img, px * cw, py * cw, cw, cw);
			});
		} else if (chaos == true) {
			load('bufff', chaosurl, function(img) {
				ctx.drawImage(img, px * cw, py * cw, cw, cw);
			});
		}

		load('butts5', foodurl, function(img) {
			ctx.drawImage(img, x * cw, y * cw, cw, cw);
		});
	}

	function paint_cell(x, y) {
		//ctx.fillStyle = "blue";
		//ctx.fillRect(x*cw, y*cw, cw, cw);

		var iconSize = cw * 1.3;
		if (d == 'right') {
			if(ss == false){
				load('butts', righturl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			}else{
				load('buttse', ssrighturl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			}

		} else if (d == 'up') {
			if (ss == false) {
				load('butts2', upurl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			} else {
				load('buttsn', ssupurl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			}
		}else if (d == 'down') {
			if (ss == false) {
				load('butts3', downurl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			} else {
				load('buttsng', ssdownurl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			}
		} else if (d == 'left') {
			if (ss == false) {
				load('butts4', lefturl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			} else {
				load('buttsngg', sslefturl, function(img) {
					ctx.drawImage(img, x * cw, y * cw, iconSize, iconSize);
				});
			}
		}
		

		//ctx.strokeStyle = "red";
		//ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function check_collision(x, y, array) {

		for (var i = 0; i < array.length; i++) {
			if (array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	function speed_text() {
		ctx.fillStyle = "yellow";
		ctx.fillRect(395, 49, 170, 38);
		
		ctx.stroketyle = "black";
		ctx.fillStyle = "green";
		ctx.font = "40px Impact";
		//if (new Date().getTime() % 4 == 0)
			ctx.fillText("2X POINTS", 400, 85);

	}
	
	function ss_text() {
		ctx.fillStyle = "yellow";
		ctx.fillRect(390, 5, 180, 40);
		
		ctx.stroketyle = "black";
		ctx.fillStyle = "blue";
		ctx.font = "40px Impact";
		//if (new Date().getTime() % 4 == 0)
			ctx.fillText("INVINSIBLE", 390, 40);

	}


	$(document).keydown(function(e) {
		var key = e.which;
		//We will add another clause to prevent reverse gear
		if (key == "37" && d != "right")
			d = "left";
		else if (key == "38" && d != "down")
			d = "up";
		else if (key == "39" && d != "left")
			d = "right";
		else if (key == "40" && d != "up")
			d = "down";
	})
	//})
}