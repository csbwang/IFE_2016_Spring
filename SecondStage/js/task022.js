var nodeQueue = [];
// 前序遍历
function preOder(node){	
	if(node != null){
		nodeQueue.push(node);
		arguments.callee(node.firstElementChild);
		arguments.callee(node.lastElementChild);
	}
}

// 中序遍历
function midOder(node){	
	if(node != null){
		arguments.callee(node.firstElementChild);
		nodeQueue.push(node);
		arguments.callee(node.lastElementChild);
	}
}

// 后序遍历
function postOder(node){	
	if(node != null){
		arguments.callee(node.firstElementChild);
		arguments.callee(node.lastElementChild);
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
			clearInterval(timer);
		}
		else{
			root.style.backgroundColor = 'blue';
		}
	},500);
}

function init(){
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function(e){
		var e = e || window.event;
		nodeQueue = [];
		var oRoot = document.getElementById('root');
		switch(e.target.id){
			case 'pre':
				preOder(oRoot);
				break;
			case 'mid':
				midOder(oRoot);
				break;
			case 'post':
				postOder(oRoot);
				break;
		}
		show();
	};
}

window.onload = init;