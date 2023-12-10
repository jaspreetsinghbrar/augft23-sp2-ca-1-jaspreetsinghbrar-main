var express = require('express');
const Sequelize = require('sequelize')

const db=require('../models/index');
var router = express.Router();

/* GET home page. */
router.get('/querya', async (req, res, next) => {
	let queryA = [];
	//getting names of product categories that are not child of any other category
	const sqlQuery=" SELECT DISTINCT Name FROM SalesLT.ProductCategory WHERE ParentProductCategoryID IS NULL ORDER BY Name ASC"
	db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
	.then(results => {
	  queryA=results
	  res.render('querya', { query: queryA });

	})
	.catch(error => {
	  res.render('querya', { query: queryA });

	});	
});

router.get('/queryb', async (req, res, next) => {
	//sql query for our scenario
	let sqlQuery=`SELECT pc.Name, AVG(p.ListPrice) AS Price FROM
     SalesLT.Product p
     JOIN
     SalesLT.ProductCategory pc ON p.ProductCategoryId = pc.ProductCategoryID
     GROUP BY pc.Name
     ORDER BY Price DESC`
	 let query=[]

	 //executing the query
	 db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
	 .then(results => {
	   query=results
	   res.render('queryb', { query: query });
 
	 })
	 .catch(error => {
		res.render('queryb', { query: query });
 
	 });	

});

router.get('/queryc', async (req, res, next) => {
	let query = [];
	//sql query for our scenario
	let sqlQuery=`
	SELECT
	pc.Name,
    pc.ParentProductCategoryID,
    AVG(p.ListPrice) AS Price
FROM
    SalesLT.Product p
JOIN
    SalesLT.ProductCategory pc ON p.ProductCategoryID = pc.ProductCategoryID
GROUP BY
    pc.ParentProductCategoryID, pc.Name
ORDER BY
    Price ASC;

`
//executing the query
db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
.then(results => {
  query=results
  res.render('queryc', { query: query });

})
.catch(error => {
	res.render('queryc', { query: query });

});	
});

router.get('/queryd', async (req, res, next) => {
	let query = [{Total:0}];
	//sql query for our scenario
	let sqlQuery=`
	SELECT
    soh.CustomerID,
    c.FirstName,
    c.LastName
FROM
    SalesLT.SalesOrderHeader soh
JOIN
    SalesLT.Customer c ON soh.CustomerID = c.CustomerID
WHERE
    soh.OrderDate BETWEEN '2008-06-01' AND '2008-06-15'
GROUP BY
    soh.CustomerID, c.FirstName, c.LastName;

	`
//executing the query
	db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
.then(results => {
  query=[{Total:results.length}]
  res.render('queryd', { query: query[0] });

})
.catch(error => {
	res.render('queryd', { query: query[0] });

});	
});

router.get('/querye', async (req, res, next) => {
	let query = [];
	//sql query for our scenario
	let sqlQuery=`
	SELECT CustomerID, FirstName, LastName
	FROM SalesLT.Customer WHERE FirstName LIKE 'a%'
	INTERSECT
	SELECT CustomerID, FirstName, LastName
	FROM SalesLT.Customer WHERE LastName LIKE '%e'
	;
	`
	//executing the query
	db.sequelize.query(sqlQuery, { type: Sequelize.QueryTypes.SELECT })
    .then(results => {
     query=results
     res.render('querye', { query: query });
    })
   .catch(error => {
	res.render('querye', { query: query });

  });	

});

router.get('/queryf', async (req, res, next) => {
	let query = [];
	res.render('queryf', { query: query });
});

router.get('/queryg', async (req, res, next) => {
	let query = [];
	res.render('queryg', { query: query });
});

router.get('/queryh', async (req, res, next) => {
	let query = [];
	res.render('queryh', { query: query });
});

router.get('/', async (req, res, next) => {
	let options = [
		{
			name: 'Query A',
			link: 'querya',
			description: 'Display the table results for Query A',
		},
		{
			name: 'Query B',
			link: 'queryb',
			description: 'Display the table results for Query B',
		},
		{
			name: 'Query C',
			link: 'queryc',
			description: 'Display the table results for Query C',
		},
		{
			name: 'Query D',
			link: 'queryd',
			description: 'Display the table results for Query D',
		},
		{
			name: 'Query E',
			link: 'querye',
			description: 'Display the table results for Query E',
		},
		{
			name: 'Query F',
			link: 'queryf',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query G',
			link: 'queryg',
			description: 'Query result for PowerBI visualization',
		},
		{
			name: 'Query H',
			link: 'queryh',
			description: 'Query result for PowerBI visualization',
		},
	];

	res.render('index', { options: options });
});

module.exports = router;

