//topics controller server

var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function() {
	return {
		find: function(req, res) {
			// console.log(req.params.id);
			Topic.findOne({_id: req.params.id}, function(err, topic){
				if(err){
					console.log('get failed');
				}else {
					// console.log(topic);
					res.json(topic);
				}
			})
		},
		findUser: function(req, res) {
			// console.log(req.params.id);
			Topic.find({user_id: req.params.id}, function(err, finduser){
				if(err){
					console.log('get failed');
				}else {
					// console.log(topic);
					res.json(finduser);
				}
			})
		},
		findUserComments: function(req, res) {
			Topic.find({"comments.user_id":req.params.id}, function(err, findusercomments){
				if(err){
					console.log('get comments failed');
				}else {
					res.json(findusercomments);
				}
			})
		},
		show: function(req, res) {
			Topic.find({}, function(err, results) {
				if(err) {
					console.log(err);
				}else {
					// console.log(results);
					res.json(results);
				}
			});
		},
		add: function(req, res) {
			var topic = new Topic({
				user_id: req.body.user_id,
				category: req.body.category,
				description: req.body.description,
				topic: req.body.topic,
				user_name: req.body.first_name,
				comments: []
			});
			topic.save(function(err){
				if(err){
					console.log('add topic failed');
				} else {
					console.log('successfully added topic');
					res.json(topic);
				}
			})
		}

}
})();
