	
		$hour = 00, $minute = 00, $second = 00;
		$timerStatus = 'active';
		function startTimer(){
			if($timerStatus == 'active'){
				setTimeout(function(){ if($timerStatus == "active"){ increaseCounter(); startTimer(); } else { startTimer(); } }, 999);
			} else if($timerStatus == 'pause') {
				
			}
		}
		
		function increaseCounter(){
			$second += 1;
			if($second >= 60){
				$second = 00;
				$minute += 1;
				if($minute >= 60){
					$minute = 00;
					$hour += 1;
					if($hour >= 24 ){
						$hour = 00;
						$('#hours').html($hour);
					} else {
						$('#hours').html($hour);
					}
					$('#minutes').html($minute);
				} else if($minute < 60){
					$('#minutes').html($minute);
				}
				$('#seconds').html($second);
			} else if($second < 60){
				$('#seconds').html($second);
			}
		}
		
		function pauseTimer(){
			if($gameStatus == 'started'){
				if($timerStatus == 'active'){
					$timerStatus = 'pause';
					$('input[type="number"]').attr('disabled','disabled');
					$('#controlTimer').html('Start');
				} else if($timerStatus == 'pause'){
					$timerStatus = 'active';
					$('input[type="number"]').removeAttr('disabled');
					$('#controlTimer').html('Pause');
					startTimer();
				}
			}
		}
		
		function resetTimer(){
			$hour = 00, $minute = 00, $second = 00;
			$timerStatus = 'pause';
			$('#hours, #minutes, #seconds').html(0);
		}