// v8 引擎 node.exe
console.log(1);

var fs = require('fs');       //以模块化安排的程序
var files = fs.readdirSync('./musics/');     //数组 music下面的所有文件
var minglinghang = require('child_process');
var result = []; 
var format_duration = function(str){          //转化成时间
	var num = Number(str);
	var fen = parseInt(num/60);
	var miao = Math.round(num%60);
	miao = (miao<10)?('0'+miao):miao;
	fen = (miao<10)?('0'+fen):fen;
	return fen +':'+miao;
}
files.forEach(function(v,k){
 	// console.log(v);
 	// var data = minglinghang.execSync('ffprobe -v quiet -print_format json -show_format ./musics/'+v);
 	// ;
 	// result.push(JSON.parse(data));
 	// 优化以后
 	var data = JSON.parse(minglinghang.execSync('ffprobe -v quiet -print_format json -show_format "./musics/'+v+'"')
 	);
 	var duration = format_duration(data.format.duration);
 	var r ={
 		filename:data.format.filename,
 		duration:duration,
 		title:data.format.tags.title,
 		album:data.format.tags.album,
 		artist:data.format.tags.artist,
 	}
 	result.push(r);

 })
// diaoyong


fs.writeFile('./databas.json',JSON.stringify(result,null,2));
