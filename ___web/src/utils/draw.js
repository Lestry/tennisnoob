export default function draw(arr, num){
	let tempArr = [],
		res = {},
		len = arr.length;
	console.log(arr, num);
	if(len % num !== 0){
		return {
			result: false,
			msg: '无法按照填写每组人数进行分组'
		};
	}else if(len === 0){
		return {
			result: false,
			msg: '参赛人员不足或未正确获取'
		};
	}else{
		while(arr.length > 0){
			tempArr.push(arr.splice(Math.floor(arr.length * Math.random()), 1)[0]);
		}
		for(let i = 1; i <= len / num; i++){
			res[i] = tempArr.splice(0, num);
		}
		return {
			result: true,
			data: res
		};
	}
}
