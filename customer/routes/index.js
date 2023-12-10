var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize')

const db=require('../models/index');
/* GET home page. */
router.get('/', async function (req, res, next) {
	res.render('index');
});
router.get('/customer', async function (req, res, next) {
	res.render('index');
});
router.get('/customer/:prefix', function (req, res, next) {
	//getting prefix from params
	const {prefix}=req.params;

	//getting all the customers where lastname start with our prefix using LIKE operator
	const sqlQuery = `SELECT * FROM SalesLT.Customer WHERE LastName LIKE '${prefix}%'`;

	// Using sequelize.query to execute the query
	db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
	  .then(results => {
		//results contain the query results
		res.render('customers', { title: 'Express', customers:results});

	  })
	  .catch(error => {
		//error on query, just displaying the error message
		console.error('Error executing raw query:', error);
	  });	
});


module.exports = router;

