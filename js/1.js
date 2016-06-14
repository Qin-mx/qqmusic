//
// var currentsong=null;
//  var onsongchange = function(){
//  	audio.play();
//  	$('#divsonglist li')removeClass('play_current').eq(currentsong).addClass('play_current');//变成绿色
//      // 这行换歌名等
//  }

// $('#divsonglist').on('click','li',function(){
// 	currentsong = $(this).index()  //当前这首歌的下标
// 	audio.src = database[currentsong].filename;
// 	onsongchange();  //ui操作
// })
// //换下一首
// $('#next-btn').on('click',function(){
// 	currentsong+=1;
// 	if(currentsong===database.length){
// 		currentsong=0;
// 	}
// 	audio.src =database[currentsong].filename;
// 	onsongchange();
// })
// //后续生成的一般用委托
// $('#divsonglist').on('mouseenter mouseleave','li',function(){
// 	$(this).toggleClass('play_hover')
// })
// $('#divsonglist').on('click','.btn_del',function(){
// 	return false; //阻止冒泡
// 	// 从数据上删除  先拿到下标
// })