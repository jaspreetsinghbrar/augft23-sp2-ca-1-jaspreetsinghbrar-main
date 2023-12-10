var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize')

const db=require('../models/index');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/product/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/product/:id', function (req, res, next) {
	//getting id of product from params
	const {id}=req.params;

	//getting product with given id
	const sqlQuery = `SELECT * FROM SalesLT.Product where ProductID=${id}`;

	let product=null
	
	// Using sequelize.query to execute the query
	db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
	  .then(results => {
		product=results[0]
		res.render('product', { title: 'Express', product});

	  })
	  .catch(error => {
		console.error('Error executing raw query:', error);
	  });	
	 console.log(product) 
});


module.exports = router;

