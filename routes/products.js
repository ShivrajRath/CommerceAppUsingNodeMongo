var express = require('express');
var router = express.Router();

router.get('/productlist', function(req, res){
	var db = req.db;
	db.collection('productlist').find().toArray(function(err, items){
		res.json(items);
	});
})

router.post('/addproduct', function(req, res){
	var db = req.db;
	db.collection('productlist').insert(req.body, function(err, result){
		res.send(
			(err === null)? {msg: ''}: {msg: err}
		);
	})
})

module.exports = router;
