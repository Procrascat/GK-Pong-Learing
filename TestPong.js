 var BallpX = 75, BallpY = 75; ////
			var BallSpeedX = 6;
			var BallSpeedY = 2;
			var canvas; 
			var canvasContext; 
			
			
			window.onload = function() {
			// window.onload gets run automatically when the page finishes loadingz
				
				// save the canvas for dimensions and its 2d context for drawing to it 
				canvas = document.getElementById('gameCanvas'); 
				canvasContext = canvas.getContext('2d'); 
				
				var framesPerSecond = 30;
				setInterval(function() {
					moveEverything();
					drawEverything();
					drawPaddle();
				}, 1000/framesPerSecond); ////

				
			}//
			
			
			ColorRect(topLeftx, topLefty, boxwidth, boxheight, fillColor)
                        
            function drawEverything() {	


				fillRect(0,0, canvas.width, canvas.height, 'black');
				
				fillRect(5, 25, 25, 100, 'white');
				
				fillCircle(BallpX, BallpY, 10, 0, Math.PI*2, false);
			}
			
				//// clear the game view by filling it with black
				canvasContext.fillStyle = 'black'; ////
				canvasContext.fillRect(0, 0, canvas.width, canvas.height); ////
				
				//// Draw Ball ////
				canvasContext.beginPath(); ////
				canvasContext.fillStyle = 'white'; ////
				canvasContext.arc(BallpX, BallpY, 10, 0, Math.PI*2, false); ////
				canvasContext.fill(); 
			 
				//// Draw Paddle ////
				canvasContext.beginPath(); ////
				canvasContext.fillStyle = 'white'; ////
				canvasContext.fillRect(5, 25, 25, 100); ////
				canvasContext.fill();
				
            
			
			function moveEverything() {
				//////// moves ball to the right 50 pixels each sec ////
				BallpX += BallSpeedX; ////
				BallpY += BallSpeedY; ////
				console.log("Ball location is now: " + BallpX +"," + BallpY); ////
				console.log("Ball speed is " + BallSpeedX * BallSpeedY); ////
				
				if(BallpX > canvas.width) {// creates boundary along right edge
					BallSpeedX *= -1; //reverses the ball's speed(sending it backwards) 
				}
				
				if(BallpX < 1) {// creates boundary along left edge
					BallSpeedX *= -1; //reverses the ball's speed(sending it forwards)	
				}	
				
				if(BallpY > canvas.height) {// creates boundary along top edge
					BallSpeedX *= -1; //reverses the ball's speed(sending it down) 
				}
				
				if(BallpY < 1) {// creates boundary along bottom edge
					BallSpeedX *= -1; //reverses the ball's speed(sending it up)	
				}	
                        }		