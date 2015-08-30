//topics comment server controller

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var Topic = mongoose.model('Topic');

module.exports = (function() {
	return {
		show: function(req, res) {
			Comment.find({}, function(err, results) {
				if(err) {
					console.log(err);
				}else {
					// console.log(results);
					res.json(results);
				}
			});
		},
		add: function(req, res) {
				var newcomment = new Comment({
				user_name: req.body.user_name,
				user_id: req.body.user_id,
				upvote: 0,
				downvote: 0,
				comment: req.body.comment
			});
			var topic = Topic.findOne({_id: req.body.topic_id}, function(err, topic){
			topic.comments.push(newcomment);
			topic.save(function(err){
				if(err){
					console.log('add comment failed');
				} else {
					console.log('successfully added comments');
					res.json(topic);
					
				}
			})
		})
	},
	upvote: function(req, res) {
		console.log(req);
		console.log('here');
		// var findcomment = Topic.findOne({comment: req.comment}, function(err, findcomment){
		// 	console.log(findcomment);
			
				// if(err){
				// 	console.log('upvote failed');
				// }else {
				// 	console.log('success upvote');
				// 	res.json(comment);
				// }
			// })
		
		// console.log(req);

		}
	//return
}
})();