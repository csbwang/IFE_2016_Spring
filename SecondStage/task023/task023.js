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
	var root = nodeQueue.shift();
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

function init(){
	var oBtn = document.getElementById('btn');
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
				preOder(oRoot);
				break;
			case 'post':
				postOder(oRoot);
				break;
		}
		show();
	};
}

window.onload = init;
