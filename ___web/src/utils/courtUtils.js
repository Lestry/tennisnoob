/*
 *	formatCourtInfo 对输入的场地信息做修正
 *	- 去掉无用字符
 *	- 替换中文括号为英文括号
 *	- 场地号的井号统一
 *	- 时间中间的中划线统一
 *	- 替换周七为周日
 *	- 防止场地号的#写在后面
*/
const formatCourtInfo = (info) => {
	const result = info
		.replace(/[\s\n\r，。【】；]/g, '')
		.replace(/[（）]/g, (a) => {															
			return a === '（' ? '(' : ')';
		})
		.replace(/＃/g, '#')
		.replace(/[～\~－_]/g, '-')
		.replace('周七', '周日')
		.replace(/(周[一二三四五六日])(\d+)\#/g, (a, b, c) => {	
			return b + '#' + c;
		});

	return result;
}


// 按照星期对场地进行排序
const courtSort = (a, b) => {
	if (convertWeek(a) > convertWeek(b)) {
		return 1;
	} else if (convertWeek(a) < convertWeek(b)) {
		return -1;
	} else {
		return 0;
	}
}


// 转换星期为数字
const convertWeek = (str) => {
	switch (str.match(/^周(.){1}/)[1]) {
		case '一':
			return 1;
		case '二':
			return 2;
		case '三':
			return 3;
		case '四':
			return 4;
		case '五':
			return 5;
		case '六':
			return 6;
		case '日':
    case '七':
    default:
			return 7;
	}
}

/**
 * 
 * @param {String} str 
 * @param {String} mode  format or count 
 */
const courtTranslate = (str, mode = 'format') => {
	let cInfo = formatCourtInfo(str);

	// 场地编号后加空格
	cInfo = cInfo.replace(/((#1?\d)+)/g, function(a) {
		return a + ' ';
	});

	// 在周X前加分隔符
	cInfo = cInfo.replace(/\(?周[一二三四五六日]/g, function(a) {
		return a === '(周' ? a : '|' + a;
	});

	// 转换为数组排序
	const cArr = cInfo.split('|');
	cArr.splice(0, 1);
	cArr.sort(courtSort);
	if (cArr.length === 0) {
		return {
			msg: '场地输入有误',
			result: false
		}
	}
	if (mode === 'format') {
		return {
			data: cArr.join('\n'),
			result: true
		};
	}
	// 开始统计贡献
	const contribution = {}
	cArr.forEach((item) => {
		const contri = item.replace(/^.*#1?\d/, '').match(/([\d-]+)(.*$)/)
		const name = contri[2]
		const hourArr = contri[1].split('-')
		const hour = hourArr[1] - hourArr[0]
		if (contribution[name]) {
			contribution[name] = contribution[name] + hour
		} else {
			contribution[name] = hour
		}
	});

	const arr = Object.getOwnPropertyNames(contribution).map(name => `${name}: ${contribution[name]}小时`)
	
	return {
		data: arr.join('\n'),
		result: true
	};
}

export {
  courtTranslate
}
