var nodeQueue = [];
var curNode = null;
var timer;

// 前序遍历
function preOder(node){	
	if(node != null){
		nodeQueue.push(node);
		for(var i = 0; i < node.childNodes.length; i++){
			if(node.childNodes[i].nodeName == 'DIV'){
				arguments.callee(node.childNodes[i]);
			}
		}
	}
}

// 后序遍历
function postOder(node){
	if(node != null){
		for(var i = 0; i < node.childNodes.length; i++){
			if(node.childNodes[i].nodeName == 'DIV'){
				arguments.callee(node.childNodes[i]);
			}
		}
		nodeQueue.push(node);
	}
}

function show(){
	root = nodeQueue.shift();
	root.style.backgroundColor = 'blue';
	timer = setInterval(function(){
		root.style.backgroundColor = 'white';
		root = null;
		root = nodeQueue.shift();
		if(root == null){
			curNode = null; //正常结束时它为空
			clearInterval(timer);
		}
		else{
			root.style.backgroundColor = 'blue';
		}
		//正在遍历是又触发了新的遍历，当前遍历还没有正常技术，记录此时正在遍历的节点
		curNode = root; 
	},500);
}

// 删除当前选中节点及其所有子节点
function nodeDelete(node){
	if(node == null){
		alert('请选中一个元素');
		return;
	}
	if(node.id == 'root'){
		alert('树根元素不能删除，请重新选择要删除的元素');
		node.style.backgroundColor = 'white';
		return;
	}
	node.innerHTML = '';
	node.parentNode.removeChild(node);
}

function nodeAdd(node){
	if(node == null){
		alert('请选中一个元素');
		return;
	}
	var newNode = document.createElement('div');
	newNode.innerHTML = document.getElementById('nodeText').value;
	node.appendChild(newNode);
}

function init(){
	var oSwap = document.getElementById('swap');
	var oBtn = document.getElementById('btn');
	var selectNode = null;
	oSwap.onclick = function(e){
		if(selectNode != null){
			// 上次被选中的元素变成一般色
			selectNode.style.backgroundColor = 'white';
		}
		var e = e || window.event;
		// 新选中的元素改变背景色
		e.target.style.backgroundColor = 'blue';
		selectNode = e.target;
	}

	oBtn.onclick = function(e){
		if(curNode != null){
			// 如果上次遍历非正常结束，则将上一次遍历的最后一个节点的背景色进行处理
			curNode.style.backgroundColor = 'white';
			clearInterval(timer);// 注意清除计时器，否则会越来越快
		}
		var e = e || window.event;
		nodeQueue = [];
		var oRoot = document.getElementById('root');
		switch(e.target.id){
			case 'pre':
				if(selectNode != null){
					selectNode.style.backgroundColor = 'white';
					selectNode = null;
				}
				preOder(oRoot);
				show();
				break;
			case 'post':
				if(selectNode != null){
					selectNode.style.backgroundColor = 'white';
					selectNode = null;
				}
				postOder(oRoot);
				show();
				break;
			case 'delete':
				nodeDelete(selectNode);
				selectNode = null;//删除过后，被选中的元素应该为空
				break;
			case 'add':
				nodeAdd(selectNode);
				break;
		}
	};
}

window.onload = init;
