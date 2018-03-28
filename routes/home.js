var express = require('express');
var router = express.Router();
var URL = require('url');
var MusicModel = require('./model.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/funmusic')
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
 	detail_desc:String
 }, { collection: 'card' });
const cardModel = mongoose.model('card',cardSchema);

console.log(cardModel.count);
// cardModel.find({}).skip(0).limit(1).exec(cb);



router.get('/list',function(req,res,next){
	var params = URL.parse(req.url,true).query;
	var response = res;
	var page = params.page;//页码
	var size = params.pageSize;//每页个数
	cardModel.count({},function(err,count) {
		cardModel.find({},null,{skip:page*(size - 1),limit:size},function(err,result,res) {
			if(err)  return console.log(err);
			console.log(result);
			console.log(count);
			var content = {status:1,data:result};
			response.send(JSON.stringify(content));
		});
	})
	
})

const cardDetailSchema = new mongoose.Schema({
	covers:[{
		origin:String,
		large:String,
		large_low:String,
		small:String,
	}],
	detail_desc:String,
	title:String,
	number:Number,
	tags:[{
 		tag_id:String,
 		name:String,
 		alias:String,
 		cover:String,
 	}],
},{collection:'card'});
//const cardDetailModel = mongoose.model('card',cardDetailSchema);

router.get('/detail',function(req,res,next){
	var params = URL.parse(req.url,true).query;
	var response = res;
	var _vol_id = params.vol_id;
	console.log(_vol_id);
	cardModel.aggregate([{ $match : { vol_id : _vol_id}},{ $project : {title : 1,covers : 1,detail_desc : 1,number : 1,tags : 1,"_id" : 0}}],(err,result,res) => {
		if(err)  return console.log(err);
		console.log(result);
		var restruct = {
			image_large:result[0].covers[0].large,
			detail_desc:result[0].detail_desc,
			title:result[0].title,
			number:result[0].number,
			tags:result[0].tags,
		}
		var content = {status:1,data:restruct};
		response.send(JSON.stringify(content));
	});
});



module.exports = router;
