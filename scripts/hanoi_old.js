let moves = 0;

let timer = {
	sec: 0,
	value: function(){
		let h = this.sec/3600 ^ 0;
		let m = (this.sec-h*3600)/60 ^ 0;
		let s = this.sec-h*3600-m*60;
		h = (h>9) ? h : '0'+h;
		m = (m>9) ? m : '0'+m;
		s = (s>9) ? s : '0'+s;
		return h+':'+m+':'+s;
	},
	start: function(){
		timerID = setInterval(function() {
			timer.sec++;
			$('.timer').text(timer.value());
		}, 1000);
	},
	stop: function(){
		clearInterval(timerID);
		$('.timer').text(timer.value());
	},
	reset: function(){
		timer.sec = 0;
		$('.timer').text(timer.value());
	}
};

function play_hanoi(difficulty) {
	// Подготовка поля
	$('#main').hide();
	$('#hanoi').css('display','flex');

	for (let i=0;i<difficulty;i++){
		let width = i*12+48;
		$('.tower:first').append('<div class="ring" style="width:'+width+'px">'+(i+1)+'</div>');
	}

	$('.btn_start').click(function(){
		timer.start();
		$('.btn_start').hide();
		$('.alert.start').hide();
		$('.btn_pause').css('display','flex');
		// Геймплей
		$('.tower').click(function(){
			if ($('.ring_selected').length > 0) {
				if ($(this).find('.ring_selected').length > 0 || ($(this).find('.ring').length > 0 && $(this).find('.ring:first').width() < $('.ring_selected').width()) ) {
					// Положил на место
					$('.ring_selected').css('margin-bottom', '-=16');
					$('.ring').removeClass('ring_selected');
				} else {
					// Сделал ход
					$('.ring_selected').prependTo($(this));
					$(this).find('.ring:first').css('margin-bottom', '-=16');
					$('.ring').removeClass('ring_selected');
					$(this).find('.ring').css('margin-bottom', '0');
					$(this).find('.ring:last').css('margin-bottom', '14px');
					moves++;
					$('.moves').text(moves);
					hanoi_check_victory();
				}
			} else if ($(this).find('.ring').length > 0) {
				// Взял кольцо
				$(this).find('.ring:first').css('margin-bottom', '+=16');
				$(this).find('.ring:first').addClass('ring_selected');
			}
		});
	});

	$('.btn_pause').click(function(){
		timer.stop();
		$('.btn_pause').hide();
		$('.btn_continue').css('display','flex');
		$('.alert.pause').css('display','flex');
	});
	
	$('.btn_continue').click(function(){
		timer.start();
		$('.btn_continue').hide();
		$('.btn_pause').css('display','flex');
		$('.alert.pause').hide();
	});

	// Проверка победы
	function hanoi_check_victory() {
		
		if ($('.tower:last .ring').length == difficulty) {
			timer.stop();
			$('.win_moves').text(moves);
			$('.win_time').text(timer.value());
			$('.alert.win').css('display','flex');
			$('.btn_pause').hide();
			$('.btn_restart').css('display','flex');
		}
	}
}


$(window).on('load', function(){
	$('.btn_easy').click(function(){
		play_hanoi(5);
	});
	$('.btn_normal').click(function(){
		play_hanoi(8);
	});
	$('.btn_hard').click(function(){
		play_hanoi(10);
	});
	$('.btn_exit').click(function(){
		if(typeof timerID !== 'undefined') {
			timer.stop();
			console.log(timerID);
			console.log('Остановлено');
			timer.reset();
		}
		
		$('#main').css('display','flex');
		$('#hanoi').hide();
		$('.ring').remove();
		$('.alert.pause').hide();
		$('.alert.win').hide();
		$('.alert.start').css('display','flex');
		$('.btn_start').css('display','flex');
		$('.btn_restart').hide();
	});

	$('.btn_pause').hide();
	$('.btn_continue').hide();
	$('.btn_restart').hide();
	$('.alert.pause').hide();
	$('.alert.win').hide();
});