var express = require('express');
var router = express.Router();
var URL = require('url');
var MusicModel = require('./model.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/card')
var db = mongoose.connection;

db.on('open',function(){
	console.log('MongoDB Connect Successed');
});

db.on('error',function(){
	console.log('MongoDB Connect Error');
});

const cardSchema = new mongoose.Schema({
	vol_id:String,
	vol_number:String,
	number:Number,
	title:String,
	summary:String,
	covers:[{
		origin:String,
		large:String,
		large_low:String,
		small:String,
	}],
	create_time:Number,
	is_free:Number,
	is_trial:Number,
	tags:[{
		tag_id:String,
		name:String,
		alias:String,
		cover:String,
	}],
	comments_count:String,
	favs_count:Number,
	url:String,
});

const cardModel = mongoose.model('card',cardSchema);


router.get('/list',function(req,res,next){
	// var music_1 = new MusicModel(
	// 	'1348',
	// 	'965',
	// 	965,
	// 	'Swan',
	// 	'',
	// 	[{
	// 		'origin':'http://img-cdn2.luoo.net/pics/vol/5a3560ee1c750.jpg',
	// 		'large':'http://img-cdn2.luoo.net/pics/vol/5a3560ee1c750.jpg!/fw/640/fh/450',
	// 		'large_low':'http://img-cdn2.luoo.net/pics/vol/5a3560ee1c750.jpg!/fw/640/fh/450/quality/50',
	// 		'small':'http://img-cdn2.luoo.net/pics/vol/5a3560ee1c750.jpg!/fw/160/fh/120'
	// 	}],
	// 	1513440000,
	// 	1,
	// 	0,
	// 	[{
	// 		'tag_id':'11',
	// 		'name':'英伦',
	// 		'alias':'Britpop',
	// 		'cover':'http://img-cdn2.luoo.net/pics/misc/201512/565e735ee28e6.jpg!/fw/220/fh/220'
	// 	},
	// 	{
	// 		'tag_id':'151',
	// 		'name':'英国',
	// 		'alias':'',
	// 		'cover':'http://www.luoo.net/static/img/avatar.gif'
	// 	}],
	// 	'171',
	// 	17164,
	// 	'http://mp3-cdn2.luoo.net/low/luoo/radio965/01.mp3'
	// 	);
	// var music_2 = new MusicModel(
	// 	'1347',
	// 	'964',
	// 	964,
	// 	'陷入至深里去',
	// 	'',
	// 	[{
	// 		'origin':'http://img-cdn2.luoo.net/pics/vol/5a2eb94874061.jpg',
	// 		'large':'http://img-cdn2.luoo.net/pics/vol/5a2eb94874061.jpg!/fw/640/fh/450',
	// 		'large_low':'http://img-cdn2.luoo.net/pics/vol/5a2eb94874061.jpg!/fw/640/fh/450/quality/50',
	// 		'small':'http://img-cdn2.luoo.net/pics/vol/5a2eb94874061.jpg!/fw/160/fh/120'
	// 	}],
	// 	1513008000,
	// 	1,
	// 	0,
	// 	[{
	// 		'tag_id':'124',
	// 		'name':'摇滚',
	// 		'alias':'Rock',
	// 		'cover':'http://img-cdn2.luoo.net/pics/misc/201512/565e8810e78d7.jpg!/fw/220/fh/220'
	// 	},
	// 	{
	// 		'tag_id':'146',
	// 		'name':'俄罗斯',
	// 		'alias':'',
	// 		'cover':'http://www.luoo.net/static/img/avatar.gif'
	// 	}],
	// 	'183',
	// 	17153,
	// 	'http://mp3-cdn2.luoo.net/low/luoo/radio964/02.mp3'
	// 	);

	// var music_3 = new MusicModel(
	// 	'1346',
	// 	'963',
	// 	963,
	// 	'理想永远不会也不应该消失',
	// 	'',
	// 	[{
	// 		'origin':'http://img-cdn2.luoo.net/pics/vol/5a2be90092c79.jpg',
	// 		'large':'http://img-cdn2.luoo.net/pics/vol/5a2be90092c79.jpg!/fw/640/fh/450',
	// 		'large_low':'http://img-cdn2.luoo.net/pics/vol/5a2be90092c79.jpg!/fw/640/fh/450/quality/50',
	// 		'small':'http://img-cdn2.luoo.net/pics/vol/5a2be90092c79.jpg!/fw/160/fh/120'
	// 	}],
	// 	1512748800,
	// 	1,
	// 	0,
	// 	[{
	// 		'tag_id':'23',
	// 		'name':'朋克',
	// 		'alias':'Punk',
	// 		'cover':'http://img-cdn2.luoo.net/pics/misc/201512/565e740c548c1.jpg!/fw/220/fh/220'
	// 	}],
	// 	'137',
	// 	16952,
	// 	'http://mp3-cdn2.luoo.net/low/luoo/radio963/02.mp3'
	// 	);

	// var music_4 = new MusicModel(
	// 	'1332',
	// 	'962',
	// 	962,
	// 	'各有少年时',
	// 	'',
	// 	[{
	// 		'origin':'http://img-cdn2.luoo.net/pics/vol/5a1adc357875e.jpg',
	// 		'large':'http://img-cdn2.luoo.net/pics/vol/5a1adc357875e.jpg!/fw/640/fh/450',
	// 		'large_low':'http://img-cdn2.luoo.net/pics/vol/5a1adc357875e.jpg!/fw/640/fh/450/quality/50',
	// 		'small':'http://img-cdn2.luoo.net/pics/vol/5a1adc357875e.jpg!/fw/160/fh/120'
	// 	}],
	// 	1511625600,
	// 	1,
	// 	0,
	// 	[{
	// 		'tag_id':'15',
	// 		'name':'电子',
	// 		'alias':'Electronic',
	// 		'cover':'http://img-cdn2.luoo.net/pics/misc/201512/565e734b4028f.jpg!/fw/220/fh/220'
	// 	},
	// 	{
	// 		'tag_id':'201',
	// 		'name':'合成器流行',
	// 		'alias':'',
	// 		'cover':'http://www.luoo.net/static/img/avatar.gif'
	// 	},
	// 	{
	// 		'tag_id':'279',
	// 		'name':'80年代',
	// 		'alias':'',
	// 		'cover':'http://www.luoo.net/static/img/avatar.gif'
	// 	}],
	// 	'275',
	// 	17359,
	// 	'http://mp3-cdn2.luoo.net/low/luoo/radio962/03.mp3'
	// 	);
	
	var params = URL.parse(req.url,true).query;
	var response = res;
	cardModel.find({},(err,result,res) => {
		if(err)  return console.log(err);
		var content = {status:1,data:[result]};
		response.send(JSON.stringify(content));
	});
	
})

module.exports = router;