var express = require('express');
var router = express.Router();

/*
* 	API接口
*		返回{result: true/false, msg: errMsg(result=false), data: requestData}
*/

// 获取court-list
router.get('/list', function(req, res) {
	var params = req.query || req.params;
	var user = user_db.get('users').find({username: params.username}).value();

	if(!user){
		res.end(JSON.stringify({result: false, msg: '用户名不存在', data: ''}));
	}else {
		res.end(JSON.stringify({result: true, data: user}));
	}
});

module.exports = router;
