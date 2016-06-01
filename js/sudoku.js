	$selected = "";  // selected game type
	$gameStatus = "Not created";
	/* on click events to choose game type */
		$('.option').click(function(){
			$selected = $(this).data('val');
			$('.option div').css('background-color','rgba(110, 115, 224, 1)');
			$(".option[data-val='"+$selected+"'] div").css('background-color','rgba(25, 29, 111, 1)');
		});
		
		function setSelected($str){
			$selected = $str;
		}
	
	/* on click events to choose game type*/
	
	/* on click events to start game */
		$('.startGame').click(function(){
			if($gameStatus == "Not created" || $gameStatus == "Not started"){
				startGame();
				resetTimer();
				$('.option div').css('background-color','rgba(110, 115, 224, 1)');
				$selected = '';
			} else if($gameStatus == "started"){
				$head = "Confirmation Message";
				$body = "Are you sure , you want to quit current game and start a new game ?";
				$actions = "<td class='popUpActionsYes' tabindex='1' >"
								+"Yes"+
							"</td>"+
							"<td class='popUpActionsNo'>"+
								"No"+
							"</td>";
				showPopUp($head, $body, $actions);
			}
		});
	/* on click events to start game */
	
	/* get random numbers between given series */
		function getNo(min, max){
			return Math.floor( Math.random() * ( max - min + 1 ) + min );
		}
	/* get random numbers between given series */
	
	
	/* first to start the game */
		function startGame(){
			if($selected == ""){
				$head = "Alert Message";
				$body = "Please click on difficulty type , the click start to start game";
				$actions = "<td class='popUpActionsOk' tabindex='1' >"+
								"Ok"+
							"</td>";
				showPopUp($head, $body, $actions);
			} else if($selected != ""){
				if($gameStatus == "Not created"){
					makeGame();
				}
				$('input[type="number"]').val('');
				$('input[type="number"]').removeAttr('readonly');
				$('input[type="number"]').removeAttr('disabled');
				createGame();
				if($selected == "veryEasy"){
					clearNos(27);
				} else if($selected == "easy"){
					clearNos(36);
				} else if($selected == "medium"){
					clearNos(45);
				} else if($selected == "hard"){
					clearNos(54);
				} else if($selected == "veryHard"){
					clearNos(63);
				} 
				addValidator(); // add onchange validator to input fields
				$gameStatus = "Not started";
				//$('.newGameContainer').addClass("hideGameContainer");
			}
		}
	/* first to start the game */
	
	
		function makeGame(){  //will create blocks for sudoku
			$current = 1;
			for($i = 1 ; $i <= 9 ; $i++){
				$('.sudokuContainer').append("<tr id='row"+$i+"'></tr>");
				for($j = $current ; $j <= $current+8 ; $j++){
					$('#row'+$i).append("<td><input type='number' min='1' max='9' id='"+$j+"' value=''></td>");
				}
					$current += 9;
			}
			
			$blockNo = 1;
			for($i = 1 ; $i <= 9 ; $i++){
				$k = $i;
				if($i >= 4 && $i < 7 ){
					$blockNo = 2;
				} else if( $i >= 7 && $i <= 9 ){
					$blockNo = 3;
				} else if( $i >= 1 && $i < 4 ){
					$blockNo = 1;
				}
				$('#'+$k).addClass("block"+$blockNo);
				for($j = 2 ; $j <= 9 ; $j++){
					$k += 9; 
					$('#'+$k).addClass("block"+$blockNo);
					
					if($j % 3 == 0){
						$blockNo += 3;
					}
				}
					$current += 9;
			}
		
		}
		
		function createGame(){ //will insert values in blocks in sudoku
			for($i = 1 ; $i <= 9 ; $i++){
				if( $i > 1){
					$start = (($i -1) * 9) + 1;
				} else { $start = $i };
				
				for($j = $start ; $j <= $start+8 ; $j++){
						if( $j%9 != 0){
							$no = $j%9;
						} else {
							$no = 9;
						}
						setNumber($no, $j);
				}
			}
			swapper();
		}
		
		function setNumber($no, $pos){  // will enter one number at a time in block
			if(!checkNumberExist($no, $pos)){
					$('#'+$j).val($no);
			} else{ $no += 1;
				if($no> 9){
					$no = $no%9;
				}
				setNumber($no, $pos);
			}
		}
		
		function swapper(){ 	// will shuffle row.columns, blocks, values values in sudoku
			for($k = 1 ; $k <= 4 ; $k++){
				swapNos(getNo(1, 9), getNo(1, 9));
			}
			for($k = 1 ; $k <= 9 ; $k += 3){
				if($k == 1 ){
					swapColumn($k, $k+1);
					swapRow($k, $k+1);
					swapColumn($k+1, $k+2);
				} else if($k == 4 ){
					swapColumn($k, $k+2);
					swapRow($k, $k+2);
					swapColumn($k+1, $k);
				} else if($k == 7 ){
					swapColumn($k, $k+1);
					swapRow($k+2, $k+1);
					swapColumn($k+1, $k+2);
				}
			}
		}
		
		function swapColumn($col1, $col2){ // will swap two columns
			if( $col1 != $col2){
				for($i = 1 ; $i <= 9 ; $i++){
					if($i != 1){
						$a = $col1 + (($i-1)*9);
						$b = $col2 + (($i-1)*9);
					} else {
						$a = $col1;
						$b = $col2;
					}
					$tmp = $('#'+$a).val();
					$('#'+$a).val($('#'+$b).val());
					$('#'+$b).val($tmp);
				}
			}
		}
		
		function swapRow($row1, $row2){ // will swap two rows
			if( $row1 != $row2){
				for($i = 1 ; $i <= 9 ; $i++){
					
						$a = ($row1 -1)  * 9 + $i;
						$b = ($row2 -1)  * 9 + $i;
						
					$tmp = $('#'+$a).val();
					$('#'+$a).val($('#'+$b).val());
					$('#'+$b).val($tmp);
				}
			}
		}
		
		function swapNos($no1, $no2){ // will swap two values
			if( $no1 != $no2 ){
				$('input[type="number"]').each(function(){
					if($(this).val() == $no1){
						$(this).val('11');
					}else if($(this).val() == $no2){
						$(this).val('12');
					}
				});
				$('input[type="number"]').each(function(){
					if($(this).val() == "11"){
						$(this).val($no2);
					}else if($(this).val() == '12'){
						$(this).val($no1);
					}
				});
			} else {
				swapNos($no1, getNo(1, 9));
			}
		}		
		
		function checkNumberExist($no, $pos){  //will check for a number exist in same row  and column and block
			$exist = false;
			
			// for block
			$block = $('#'+$pos).attr('class');
			$('.'+$block).each(function(){
				if($pos != $(this).attr("id")){
					if($(this).val() == $no){
						$exist = true;
						return false;
					}
				}
			});
			
			if($pos % 9 != 0){
				 $a1 = ($pos - ($pos % 9)) + 1;
				 $a2 = ($pos - ($pos%9)) + 9;
				 $b1 = ($pos % 9);
				 $b2 = ($pos%9) +(8*9);
			} else if($pos % 9 == 0){
				 $a1 = $pos - 8 ;
				 $a2 = $pos;
				 $b1 = 9;
				 $b2 = 81;
			} 
			
			// for row
			for($row =  $a1 ; $row < $a2 ; $row++){
				if($row != $pos){
					if($('#'+$row).val() == $no){
						$exist = true;
						break;
					}
				}
			}
			
			// for cloumn
			for( $col =  $b1 ; $col <= $b2 ; $col += 9 ){
				if($col != $pos){
					if($('#'+$col).val() == $no){
						$exist = true;
						break;
					}
				}
			}
			return $exist;
		}
		
		function checkPositionFilled($pos){
			if($('#'+$pos).val() != ""){
				return true;
			} else return false;
		}
		
		function clearNos($num){ // will empty the blocks according to given number of iterations
			if($num > 0){
				$no = getNo(1,81);
				if($('#'+$no).val() != ""){
					$('#'+$no).val('');
					clearNos($num-1);
				} else { 
					clearNos($num);
				}
			} else {
				$('input[type="number"]').each(function(){
					if($(this).val() != ""){
						$(this).attr("style", "color:#000;");
						$(this).attr("readonly", "");
					}
				});
			}
		}
		
		function addValidator(){ // validator will check for the entered number is valid 
			$timerExecute = 1;
			$('.timeTakenConatiner').show();
			
			$('input[type="number"]').change(function(){
				$pos = $(this).attr("id");
				if(!checkNumberExist($(this).val(), $pos )){
					$("#"+$pos).removeAttr("style");
					if(checkGameFinished()){
						$head = "Congratulations";
						$body = "You have won the game";
						$actions = "<td class='popUpActionsOk' tabindex='1' >"+
								"Thanks, lemme choose another game"+
							"</td>";
						showPopUp($head, $body, $actions);
					}
					$gameStatus = "started";
					
				} else if($(this).val() == ""){
					$("#"+$pos).removeAttr("style");
				} else {
					$("#"+$pos).attr("style", "background-color:#A00; color:white;");					
				}
				
					if($timerExecute == 1){
						$timerStatus = 'active';
						startTimer();
						$timerExecute = 0;
					}
			});
		}
		
		function checkGameFinished(){ // this will check if game is finished 
			$finished = true;
			$('input[type="number"]').each(function(){
				if($(this).val() == ""){
					$finished = false;
				}
			});
			return $finished;
		}
		
		function addConfirmationPopUpListener(){ // popup action listener
			$('.popUpActionsYes').click(function(){
				$gameStatus = "Not started";
				$('.startGame').click();
				$('.popUpContainer').fadeOut();
			});
			$('.popUpActionsNo, .popUpActionsOk').click(function(){
				$('.popUpContainer').fadeOut();
			});
			$('body').keypress(function(e){
				if(e.keyCode == 13 || e.keyCode == 27){
					$('.popUpContainer').fadeOut();
					e.preventDefault();
					$('body').off();
				}
			});
		}
		
		function showPopUp($head, $body, $actions){ // will shoe the popup according to given arguments
			$('.popUpHeader').html($head);
			$('.popUpBodyContent').html($body);
			$('.Actions').html($actions);
			$('.popUpContainer').fadeIn();
			addConfirmationPopUpListener();
		}
		
		/* new game animation listeners */
		if(screen.width >= 1000){
			$('.newGameContainer').hover(function(){ 
				if($gameStatus != "Not created"){
					$(this).removeClass("hideGameContainer");
				}
			});
			
			$('.newGameContainer').mouseleave(function(){
				if($gameStatus != "Not created"){
					$(this).addClass("hideGameContainer");
				}
			});
		} else if(screen.width < 1000){
			//other animation here
		}
		/* new game animation listeners */