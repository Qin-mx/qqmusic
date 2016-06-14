$(function(){
	// 获取类
	var audio = $('audio').get(0);
	var foldbt = $('.fold-bt');
	var bofan = $('.play-bt');
	var volumebar = $('.volume-bar');
	var volumeop =$('.volume-op');
	var list =$('.player-list-frame');
	var currentsong=null;
	var database = [];
	$.getJSON("databas.json")
	.done(function(data){
		database = data;
		read();
	});
	function read(){
		$('.music-list').empty();
		$.each(database,function(k,v){
			$('<li class="li"><strong class="music-name" title="'+v.title+'">'+v.title+'</strong><strong class="singer-name" title="'+v.album+'">'+v.album+'</strong><strong class="play-time">'+v.duration+'</strong><div class="list_cp"><strong class="bt_like" title="喜欢" name="" mid="004fQTu016b9W4"><span>我喜欢</span> </strong><strong class="bt_share" title="分享"><span>分享</span> </strong><strong class="bt_fav" title="收藏到歌单"> <span>收藏</span></strong><strong class="bt_del" title="从列表中删除"><span>删除</span> </strong></div></li>')
			.appendTo('.music-list');
					$('.open-list span').text(database.length);
		})
	}
	//转换时长
	var format_duration = function(str){          //转化成时间
	var num = Number(str);
	var fen = parseInt(num/60);
	var miao = Math.round(num%60);
	miao = (miao<10)?('0'+miao):miao;
	fen = (miao<10)?('0'+fen):fen;
	return fen +':'+miao;
	}
	//播放暂停
	bofan.on('click',function(){
		$('#divsonglist li').removeClass('play_current').eq(currentsong).addClass('play_current');
		bofan.toggleClass('play-bt');
		bofan.toggleClass('pause-bt');
		if(bofan.hasClass('pause-bt')){
			audio.play();
		}else{
			audio.pause();
		}		
	})
	//进度条　
	$('#player-gai').on('click',function(e){
		var jindu = (e.offsetX/this.offsetWidth)*audio.duration;
		audio.currentTime = jindu;
	})
	$('audio').on('timeupdate',function(){
		var  width = (this.currentTime/this.duration).toFixed(2)*100;
		$('.current-bar').width(width+ '%');
		$('.progress-bar').css('left',(width-1)+'%');
	})
	$('#player-gai').on('mousedown',function(){
		$('#player-gai').on('mousemove',function(e){
			var jindu = (e.offsetX/this.offsetWidth)*audio.duration;
			audio.currentTime = jindu;
		})
		$('#player-gai').on('mouseup',function(){
		$('#player-gai').off('mousemove');
	})
	})
	// 拖动

	// 音量控制 
	// 点击
	$('#zhegai').on('click',function(e){
   		  audio.volume = e.offsetX/this.offsetWidth;
  		})
	$('audio').on('volumechange',function(e){
		var yinliang = audio.volume.toFixed(2)* 100+'%';
		$('.volume-op').css("left",yinliang);
		$('.volume-bar').css("width",yinliang);
		if($('.volume-bar').width()==0){
			$('#spanmute').removeClass('volume-icon').addClass('volume-mute');
		}else{
			$('#spanmute').addClass('volume-icon').removeClass('volume-mute');
		}
	})
	$('#spanmute').on('click',function(){
		$('#spanmute').toggleClass('volume-icon').toggleClass('volume-mute');
		if(audio.volume!==0){
			yiqian = audio.volume;
			audio.volume=0;		
		}else{
			audio.volume=yiqian;
		}
	})
	//托动
	  $('#zhegai').on('mousedown',function(){
	    $('#zhegai').on('mousemove',function(e){
	      audio.volume =  e.offsetX/this.offsetWidth;
	    })
	   	$('#zhegai').on('mouseup',function(){
	    $('#zhegai').off('mousemove');
	  })
	  })

	// 歌曲跳转
	$('.prev-bt').on('click',function(){	
		currentsong -= 1;
		if(currentsong===-1){
			currentsong=database.length-1;
		};
		audio.src=database[currentsong].filename;
		onchange();
	})
	$('.next-bt').on('click',function(){
		currentsong +=1;	
		if(currentsong===database.length){
			currentsong=0;
		};
		audio.src=database[currentsong].filename;
		onchange();

	})
	// 选歌的时候
	$('#divsonglist').on('click','li',function(){
		currentsong = $(this).index()  
		audio.src = database[currentsong].filename;
		onchange();  
	})
	 //鼠标hover显示当前时长
   $('#player-gai').on('mouseenter mousemove',function(e){
   		// console.log(1)
   		// $('#time-show').text(format_duration(audio.duration * (e.offsetX / $(this).width())) );
       var left = $(this).width()*(e.offsetX/$(this).width())-$('.time-show').width()/2;
       $('.time-show').css({'left':left,'display':'block'}); 
   })
   $('#player-gai').on('mouseleave',function(){
       $('.time-show').css({'display':'none'}); 
   })
        //清空列表
    $('.clear-list').on('click',function(){
    	$('.single_list').css('display','none');
    	$('.list-point').css('display','block');
    	$('.open-list span').text(0);
    })
    $('.close-list').on('click',function(){
    	$('.player-list-frame').css('opacity','0');
    })
    //删除歌曲
    $('ul').on('click','.bt_del',function(){
	console.log($(this))
	$(this).closest('li').css('display','none');
	return false; 
})
// 界面处理
	//收起/展开 	
	foldbt.on('click',function(){	
			list.css('opacity','0');
		if(!$('#my-player').hasClass('my-player-folded')){		
			$('#my-player').animate({left:'-540px'},200).addClass('my-player-folded');
		}else{
			$('.my-player').animate({left:0},200).removeClass('my-player-folded');
		}
	})
	$('.open-list').on('click',function(){
			var op=list.css('opacity');
		if(op==1){
			console.log(op)
			list.animate({opacity:0},200);
		}else{
			list.animate({opacity:1},200);
		}
	})
	//更换播放模式
	$('#btnPlayway').on('click',function(){
		$('.playbar-select').css('display','block');
	})
		$('.playbar-select').on('click','strong',function(){
		if($(this).hasClass('unordered-bt')){
			$('#btnPlayway').removeClass('cycle-bt').addClass('unordered-bt')
		}else if($(this).hasClass('ordered-bt')){
			$('#btnPlayway').removeClass('cycle-bt').addClass('ordered-bt')
		}else if($(this).hasClass('cycle-single-bt')){
			$('#btnPlayway').removeClass('cycle-bt').addClass('cycle_single-bt')
		}else if($(this).hasClass('cycle-bt')){
			$('#btnPlayway').removeClass('cycle-bt').addClass('cycle-bt')
		}
		$('.playbar-select').css('display','none');
	})
	// 点击后的改变
	function onchange(){
		audio.play();
		bofan.addClass('pause-bt');
		bofan.removeClass('play-bt');
		$('#divsonglist li').removeClass('play_current').eq(currentsong).addClass('play_current');
		$('.music-name-t').html(database[currentsong].title);
		$('.singer-name-t').html(database[currentsong].album)
		$('.play-date').html(database[currentsong].duration).css('display','block');
	}
	// 移入移出
	$('.music-list').on('mouseenter mouseleave','li',function(){
		$('li').removeClass('play-hover');
		$(this).addClass('play-hover');

	})
	$('.music-list').on('mouseleave','li',function(){
		$(this).removeClass('play-hover');

	})

})