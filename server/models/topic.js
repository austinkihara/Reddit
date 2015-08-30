//topic.js model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
	user_id: String,
	category: String,
	description: String,
	topic: String,
	user_name: String,
	comments: []
});
var CommentSchema = new mongoose.Schema({
	user_name: String,
	user_id: String,
	upvote: Number,
	downvote: Number,
	comment: String, 
 }) 

mongoose.model('Comment', CommentSchema);
mongoose.model('Topic', TopicSchema);