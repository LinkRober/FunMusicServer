function Covers(){
	this.origin;
	this.large;
	this.large_low;
	this.small;
}

function Tag(){
	this.tag_id;
	this.name;
	this.alias;
	this.cover;
}

function MusicModel(vol_id,vol_number,title,summary,audioUrl,covers,create_time,is_free,is_trial,comments_count,favs_count){
	this.vol_id = vol_id;
	this.vol_number = vol_number;
	this.title = title;
	this.summary = summary;
	this.audioUrl = audioUrl;
	this.covers = covers;
	this.create_time = create_time;
	this.is_free = is_free;
	this.is_trial = is_trial;
	this.comments_count = comments_count;
	this.favs_count = favs_count;
}

module.exports = MusicModel;