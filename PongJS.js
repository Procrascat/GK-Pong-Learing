            var BallpX = 400, BallpY = 300; ////
			var BallSpeedX = -3;
			var BallSpeedY = -3;
			var BallPos;
			var canvas; 
			var canvasContext; 
			var P_VPos = 250;
			const P_HEIGHT = 100;
			const P_Width = 25; 
			const AI_Width = 25;
			const AI_HEIGHT = 100;
			var AI_VPos = 250;		
			var LP_Score = 0;
			var RP_Score = 0;
			var AI_Center;
			var P_Center = P_VPos + (P_HEIGHT/2);
			const Win_Score = 10;
			var Win_Screen = false; 
			const BallSpeed = BallSpeedX*BallSpeedY;
			var Ballcolor = 'white';
			

			function MouseToPaddlePos(evt) {
				var rect = canvas.getBoundingClientRect(), root = document.documentElement;
				
				//// account for the margins, canvas position on page scroll amount, etc.
				var mouseX = evt.clientX - rect.left - root.scrollLeft;
				var mouseY = evt.clientY - rect.top - root.scrollTop;
				return {
					x: mouseX,
					y: mouseY
				};
			}		
			
			
			window.onload = function() {
			// window.onload gets run automatically when the page finishes loading
				
				// save the canvas for dimensions and its 2d context for drawing to it 
				canvas = document.getElementById('gameCanvas'); 
				canvasContext = canvas.getContext('2d'); 
				
				var framesPerSecond = 60;
				setInterval(function() {
					moveEverything();
					drawEverything();					
				}, 1000/framesPerSecond); ////
				
				canvas.addEventListener('mousemove', function(evt) {
					var mousePos = MouseToPaddlePos(evt); 
					P_VPos = mousePos.y - (P_HEIGHT/2); ////minus half height to center paddle
				} ); //			

				
			

				
			} //
			

			
            function colorRect() {
				//// clear the game view by filling it with black
				canvasContext.fillStyle = 'black'; ////
				canvasContext.fillRect(0, 0, canvas.width, canvas.height); ////
			}
			
			function winRect() {
				//// clear the game view by filling it with black
				canvasContext.fillStyle = 'grey'; ////
				canvasContext.fillRect(0, 0, canvas.width, canvas.height); ////
			}

			function Net() {
				///draw net				
				for(var NYPos = 0; NYPos < canvas.height; NYPos += 30) {
					///canvasContext.beginPath(); /// 
					canvasContext.fillStyle = 'white'; ////
					canvasContext.fillRect(canvas.width/2 - 1, NYPos, 2,15 ); ///// 
					///canvasContext.fill(); /// 
				}
			}
			 
			function paddle() {
				////Draw Paddle
				canvasContext.beginPath(); ////
				canvasContext.fillStyle = 'white'; ////
				canvasContext.fillRect(10, P_VPos, P_Width, P_HEIGHT); ////
				canvasContext.fill();			
			}
			
			function colorCircle() {
				//// Draw Ball ////
				canvasContext.beginPath(); ////
				canvasContext.fillStyle = Ballcolor; ////
				canvasContext.arc(BallpX, BallpY, 10, 0, Math.PI*2, false); ////
				canvasContext.fill(); 
			}
			
			function comp() {
				
				/////Draw AI Paddle
				canvasContext.beginPath(); ////
				canvasContext.fillStyle = 'white'; ////
				canvasContext.fillRect(765, AI_VPos, AI_Width, AI_HEIGHT); ////
				canvasContext.fill();	
			}			
			
			function score() {
				
				////Displays score
				canvasContext.write
				canvasContext.font = "100px Arial"
				canvasContext.fillStyle = 'white'
				canvasContext.fillText(LP_Score, canvas.width*.25, 100)
				canvasContext.fillText(RP_Score, canvas.width*.75, 100)

				if(BallpX <= 0){
					RP_Score += 1;///
				}

				if(BallpX >= canvas.width){
					LP_Score += 1;///
				}

				
			}
			
			function drawEverything() {

				if(Win_Screen){
					winRect();
					
					if(LP_Score >= Win_Score){
						canvasContext.write
						canvasContext.font = "100px Arial"
						canvasContext.fillStyle = 'white'
						canvasContext.textAlign = 'center'
						canvasContext.fillText("Player 1 Wins!", canvas.width/2, canvas.height/2)
					}
					if(RP_Score >= Win_Score){
						canvasContext.write
						canvasContext.font = "100px Arial"
						canvasContext.fillStyle = 'white'
						canvasContext.textAlign = 'center'
						canvasContext.fillText("Player 2 Wins!", canvas.width/2, canvas.height/2)
					}	
					
					canvasContext.write
					canvasContext.font = "25px Arial"
					canvasContext.fillStyle = 'white'
					canvasContext.textAlign = 'center'
					canvasContext.fillText("Click to Restart", canvas.width/2, canvas.height*.75)

					return;
				}

				////Background
				colorRect();
				////Net
				Net(); /// 
				////Paddle
				paddle();
				////Paddle for AI
				comp(); ////
				////Ball
				colorCircle(); ////		
				////score
				score(); ////
				////Fireball 
				Fireball(); ////
				
				

			}
						
			function Fireball() {
				if(BallSpeed >= 30 || BallSpeed <= -30) {
					Ballcolor == 'red'; ////
				}

				if(BallSpeed <= 30 || BallSpeed >= -30) {
					Ballcolor == 'white'; ////
				}
				
			}

			function ballReset() {
				BallpX = canvas.width/2; ////
				BallpY = canvas.height/2; ////
				
				if(RP_Score >= Win_Score || LP_Score >= Win_Score){
					Win_Screen = true;
				}
			
			}
			
			function Ai_Movement() {
				/////////AI for right paddle
				AI_Center = AI_VPos + (AI_HEIGHT/2);	////
				if(BallPos > (AI_Center+15)) {
						AI_VPos += 3.5 + Math.random()*4; ////
					}
				if(BallPos < AI_Center-15) {
						AI_VPos -= 3.5 + Math.random()*4; ////
					}								

			}
			
			function Boundaries() {
				//Boundaries 
				// creates boundary along right edge
				if(BallpX > canvas.width) {				
					ballReset();
					BallSpeedX = -3; 
					BallSpeedY = -3;
					score();
				  
				}
				
				// creates boundary along left edge
				if(BallpX < 0) {										
					ballReset(); //// 
					BallSpeedX = 3;	
					BallSpeedY = -3;
					score();	
				}
				
				// creates boundary along top edge
				if(BallpY > canvas.height) {
					BallSpeedY *= -1; //reverses the ball's speed(sending it down) 
				}
				
				// creates boundary along bottom edge
				if(BallpY < 0) {
					BallSpeedY *= -1; //reverses the ball's speed(sending it up)	
				}	
			}
			

			function moveEverything() {
				
				if(Win_Screen){

					canvas.addEventListener('click', function(evt) {					
						Win_Screen = false;
						ballReset();
						LP_Score -= LP_Score;
						RP_Score -= RP_Score;
					} );
					return;
				}

				Boundaries(); ////	

				Ai_Movement(); ////

				
				//////// moves ball each sec ////	
				BallpX += BallSpeedX;
				BallpY += BallSpeedY;

				BallPos = BallpY; ////
				console.log("Ball location is now: " + BallpX +"," + BallpY); ////
				console.log("Ball speed is " + BallSpeedX * BallSpeedY); ////
				console.log("Paddle Vertical Position:" + P_VPos); ////		
				console.log(BDeflectionP * .35);
									
				
				if(BallpX < P_Width + 22 && BallpY >= P_VPos && BallpY <= P_VPos + P_HEIGHT) { //If the ball moves beyond the left edge of the screen				   
						BallSpeedX *= -1; // Paddle collision 																		
											
						var BDeflectionP = BallpY - (P_VPos + P_HEIGHT/3);

						BallSpeedY = BDeflectionP * .35;
					
					
				} 

							
				
				
				if(BallpX > 765 && BallpY >= AI_VPos && BallpY <= AI_VPos + AI_HEIGHT) { //If the ball moves beyond the right edge of the screen		
						BallSpeedX *= -1; // Paddle collision 										
						
						var BDeflectionAI = BallpY - (AI_VPos + AI_HEIGHT/3);

						BallSpeedY = BDeflectionAI * .35;
		          
				}
				
			}			