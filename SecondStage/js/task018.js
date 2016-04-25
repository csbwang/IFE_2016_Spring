function queueInsert(location){
	var oQueue = document.getElementById('queue');
	var num = (document.getElementById('input-box').value).match(/^\s*\d+\s*$/);
	if(num == null){
		alert('输入不合法，请重新输入');
		return;
	}
	var newNode = document.createElement('div');
	newNode.innerHTML = num;
	newNode.onclick = function(){
		this.parentNode.removeChild(this);
	}
	if(location === 'left'){
		oQueue.insertBefore(newNode, oQueue.firstChild);
	}
	else{
		oQueue.appendChild(newNode);
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
		}
	}
}

window.onload = init;
