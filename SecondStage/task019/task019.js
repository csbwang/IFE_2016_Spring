function queueInsert(location){
	var oQueue = document.getElementById('queue');
	var num = (document.getElementById('input-box').value).match(/^\s*\d+\s*$/);
	if(num == null || num < 10 || num > 100){
		alert('输入不合法，请重新输入');
		return;
	}
	if(oQueue.childNodes.length > 60){
		alert('队列已满，不能再插入');
		return;
	}
	if(location === 'left'){
		oQueue.innerHTML = '<div style="height:' + num * 5 + 'px"></div>' + oQueue.innerHTML;
	}
	else{
		oQueue.innerHTML = oQueue.innerHTML + '<div style="height:' + num * 5 + 'px"></div>';
	}
}

function queueDelete(location){
	var oQueue = document.getElementById('queue');
	if(oQueue.childNodes.length < 1){
		alert('队列为空，无法删除');
		return;
	}
	if(location === 'left'){
		alert('删除' + (oQueue.firstChild.offsetHeight / 5));
		oQueue.removeChild(oQueue.firstChild);
	}
	else{
		alert('删除' + (oQueue.lastChild.offsetHeight / 5));
		oQueue.removeChild(oQueue.lastChild);
	}
}

//直接产生结果，不会显示中间过程
// function sort(){
// 	var oQueue = document.getElementById('queue');
// 	var i, j, len = oQueue.childNodes.length, tmp, isExchanged = false, timer;
// 	for(i = 0; i < len - 1; i++){
// 		isExchanged = false;
// 		for(j = 0; j < len - i - 1; j++){
// 			if(oQueue.childNodes[j].offsetHeight > oQueue.childNodes[j + 1].offsetHeight){
// 				tmp = oQueue.childNodes[j + 1].offsetHeight;
// 				oQueue.childNodes[j + 1].style['height'] = oQueue.childNodes[j].offsetHeight + 'px';
// 				oQueue.childNodes[j].style['height'] = tmp + 'px';
// 				isExchanged = true;
// 			}
// 		}
// 		if(!isExchanged){
// 			return;
// 		}
// 	}
// }

// 排序的过程可以显示出来
function sort(){
	var oQueue = document.getElementById('queue');
	var i = 0, j = 0, len = oQueue.childNodes.length, tmp, isExchanged = false, timer;
	timer = setInterval(function(){
		if(oQueue.childNodes[j].offsetHeight > oQueue.childNodes[j + 1].offsetHeight){
			tmp = oQueue.childNodes[j + 1].offsetHeight;
			oQueue.childNodes[j + 1].style['height'] = oQueue.childNodes[j].offsetHeight + 'px';
			oQueue.childNodes[j].style['height'] = tmp + 'px';
			isExchanged = true;
		}
		j++;
		if(j >= len - i - 1){
			if(!isExchanged){
				clearInterval(timer);
			}
			else{
				i++;
				j = 0;
				isExchanged = false;
			}
		}
	}, 10);
}

function init(){
	var oBtns = document.getElementsByName('button');
	for(var i = 0; i < oBtns.length; i++){
		switch(i){
			case 0:
				oBtns[i].onclick = function(){
					queueInsert('left');
				}
				continue;
			case 1:
				oBtns[i].onclick = function(){
					queueInsert('right');
				}
				continue;
			case 2:
				oBtns[i].onclick = function(){
					queueDelete('left');
				}
				continue;
			case 3:
				oBtns[i].onclick = function(){
					queueDelete('right');
				}
				continue;
			case 4:
				oBtns[i].onclick = function(){
					sort();
				}
				continue;
			default:
				alert('有按钮没有绑定事件');
		}
	}
}

window.onload = init;
