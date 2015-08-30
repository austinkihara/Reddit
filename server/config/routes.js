var topics = require('./../controllers/topics.js');
var comments = require('./../controllers/comments.js')

var bodyparser = require('body-parser');

module.exports = function(app) {
	app.use(bodyparser.json());
	//topics routes
	app.get('/topics', function(req, res) {
	topics.show(req,res);
})
	app.get('/comments', function(req, res){
	comments.show(req,res);
})
	app.get('/topic/:id', function(req, res) {
	topics.find(req,res);
})
	app.get('/user/:id', function(req, res) {
	topics.findUser(req,res);
})
	app.get('/usercomments/:id', function(req, res){
	topics.findUserComments(req,res);
})
	app.post('/addtopic', function(req, res){
	topics.add(req, res);
})
	app.post('/addcomment', function(req, res){
	comments.add(req, res);
})
	app.post('/upvote', function(req, res){
	comments.upvote(req, res);
})
// 	app.get('/user/:id' function(req, res){
// 	topics.find(req, res);
// })

}