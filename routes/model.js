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

function MusicModel(vol_id,vol_number,number,title,summary,covers,create_time,is_free,is_trial,tags,comments_count,favs_count,audioUrl){
	this.vol_id = vol_id;
	this.vol_number = vol_number;
	this.number = number;
	this.title = title;
	this.summary = summary;
	this.covers = covers;
	this.create_time = create_time;
	this.is_free = is_free;
	this.is_trial = is_trial;
	this.tags = tags;
	this.comments_count = comments_count;
	this.favs_count = favs_count;
	this.url = audioUrl;
}

module.exports = MusicModel;