db.card.aggregate([
		{"$project" : {"_id" : 0,"tags" : 1}},
		{"$unwind" : "$tags"}
	])
db.card.update({"number" : 962},{"$set" : {"detail_desc" : "80年代是最好的时代，音乐同样也是。如今过去了这么多年，那些时光里发生的音乐依然代替着我们永恒着。虽然在大多数时候，音乐所呈现出来的激动人心和叛逆美好，是我们对记忆、未来过滤美化后的产物，但是他足够让我们在庸常的生活里用敏感的细节尽情干杯。对我们这一代人来说，最大的悲哀是，青春来不及或者说容不得叛逆就已经行将结束了。还好的是，虽然话语权从来不在我们手中，而自由却总是在的。"}})


db.card.aggregate([
					{"$project" : {"covers" : 1,"detail_desc" : 1,"_id" : 0}},
					{"$match" : {"vol_id" : {"$eq" : "1348"}}}
					])
db.card.aggregate([
					{
						"$match" : {"vol_id" : {"$eq" : "1348"}}
					};
					{
						"$project" : {"covers" : 1,"detail_desc" : 1,"_id" : 0},
					}
				])

db.card.aggregate([
		{"$limit" : 1},
		{"$skip" : 1},
	]).pretty()
db.card.find().skip(2).limit(2).pretty()

