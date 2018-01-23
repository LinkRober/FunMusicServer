var express = require('express');
var router = express.Router();
var URL = require('url');
var MusicModel = require('./model.js');

router.get('/list',function(req,res,next){
	var music_1 = new MusicModel('1','1','Here With Me','describe title_1',{'origin':'http://fun-image.oss-cn-beijing.aliyuncs.com/1.jpeg'},0,1,0,0,0);
	var music_2 = new MusicModel('2','2','Love The Way You Lie','describe title_2',{
																					'origin':'http://fun-image.oss-cn-beijing.aliyuncs.com/2.jpeg'
},0,1,0,0,0);
	var params = URL.parse(req.url,true).query;
	var response = {status:1,data:[music_1,music_2]};
	res.send(JSON.stringify(response));
})

module.exports = router;