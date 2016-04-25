function queueInsert(location){
	var oQueue = document.getElementById('queue');
	var pattern = /[a-zA-Z0-9\u4e00-\u9fa5]+/g;
	var elements = (document.getElementById('input-box').value).match(pattern);
	if(elements == null){
		alert('输入不能为空，请输入');
		return;
	}
	if(oQueue.childNodes.length > 60){
		alert('队列已满，不能再插入');
		return;
	}
	if(location === 'left'){
		for(var i = 0; i < elements.length; i++){
			oQueue.innerHTML = '<div>' + elements[i] + '</div>' + oQueue.innerHTML;
		}
		
	}
	else{
		for(var i = 0; i < elements.length; i++){
			oQueue.innerHTML = oQueue.innerHTML + '<div>' + elements[i] + '</div>';
		}
	}
}

function queueDelete(location){
	var oQueue = document.getElementById('queue');
	if(oQueue.childNodes.length < 1){
		alert('队列为空，无法删除');
		return;
	}
	if(location === 'left'){
		alert(oQueue.firstChild.innerHTML);
		oQueue.removeChild(oQueue.firstChild);
	}
	else{
		alert(oQueue.lastChild.innerHTML);
		oQueue.removeChild(oQueue.lastChild);
	}
}

function strSerach(){
	var pattern = document.getElementById('serach-input').value;
	var oQueue = document.getElementById('queue');
	var regExp = new RegExp(pattern);
	for(var i = 0; i < oQueue.childNodes.length; i++){
		if(regExp.test(oQueue.childNodes[i].innerHTML)){
			oQueue.childNodes[i].style['background-color'] = 'green';
			oQueue.childNodes[i].style['color'] = '#CD8F1F';
		}
		else{
			oQueue.childNodes[i].style['background-color'] = 'red';
			oQueue.childNodes[i].style['color'] = 'white';
		}
	}
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
					strSerach();
				}
				continue;
			default:
				alert('有按钮没有绑定事件');
		}
	}
}

window.onload = init;
