var express = require('express');
var router = express.Router();

/*
* 	API接口
*		返回{result: true/false, msg: errMsg(result=false), data: requestData}
*/

// 获取court-list
router.get('/list', function(req, res) {
	res.end(JSON.stringify({
		result: true, 
		data: [
			{
				id: '1',
				date: '2018-03-15',
				time: 2,
				no: 3,
				orderer: '电波',
				orderer_name: '张先生'
			}
		]
	}));
});

module.exports = router;
