var nodeQueue = [];
var curNode = null;
var timer;
// 深度前序遍历当前目录文件
function preOrder(node){
	if(node != null){
		nodeQueue.push(node);
		for(var i = 0; i < node.childNodes.length; i++){
			if(node.childNodes[i].nodeName == 'DIV'){
				arguments.callee(node.childNodes[i]);
			}
		}
	}
}

// 深度后序遍历当前目录文件
function postOrder(node){
	if(node != null){
		for(var i = 0; i < node.childNodes.length; i++){
			if(node.childNodes[i].nodeName == 'DIV'){
				arguments.callee(node.childNodes[i]);
			}
		}
		nodeQueue.push(node);
	}
}

function traverseShow(){
	var pattern = document.getElementById('serachPattern')
	.value.match(/[a-zA-Z0-9\u4e00-\u9fa5]+/g);
	var reg = new RegExp(pattern);
	if(curNode != null){
		// 有元素没有恢复正常背景，可能是被选中或者被抢断遍历，需要处理
		curNode.style.backgroundColor = 'white';
		clearInterval(timer);// 注意清除计时器，否则会越来越快
	}
	// 清空要显示的节点队列
	nodeQueue = [];
	// 深度遍历当前所有目录，将所有节点加入到显示节点队列中
	console.log(pattern);
	if(pattern != null){
		// 按模式搜索时采用后序遍历，防止父节点的innerText直接包含子节点的内容而被误认为搜索成功
		postOrder(document.getElementById('product'));
	}
	else{
		preOrder(document.getElementById('product'));
	}
	// 显示遍历第一个节点
	node = nodeQueue.shift();
	node.style.backgroundColor = 'blue';
	// 如果它有子目录，则显示它的a标签并设置其为展开标志
	if(node.firstElementChild != null && node.firstElementChild.nodeName == 'A'){
		node.firstElementChild.style.display = 'inline-block';
		node.firstElementChild.innerHTML = '+';
	}
	// 如果有模式串，则进行匹配搜索
	if(pattern != null){
		if(reg.test(node.innerText)){
			node.style.backgroundColor = 'green';
			curNode = node;
			return;
		}
	}
	// 设置计时器显示遍历过程动画
	timer = setInterval(function(){
		// 上一个节点背景恢复为默认
		node.style.backgroundColor = 'white';
		node = null;
		node = nodeQueue.shift();
		// 如果队列中没有节点可用，则停止遍历动画
		if(node == null){
			curNode = null; //正常结束时它为空
			clearInterval(timer);
		}
		else{
			// 遍历到的当前节点背景高亮
			node.style.backgroundColor = 'blue';
			// console.log(node.innerText);
			node.style.display = 'block';
			// 如果它有子目录，则显示它的a标签并设置其为展开标志
			if(node.firstElementChild != null && node.firstElementChild.nodeName == 'A'){
				node.firstElementChild.style.display = 'inline-block';
				node.firstElementChild.innerHTML = '+';
			}
			// 如果有模式串，则进行匹配搜索
			if(pattern != null){
				if(reg.test(node.innerText)){
					node.style.backgroundColor = 'green';
					curNode = node;
					clearInterval(timer);
				}
			}
		}
		//正在遍历是又触发了新的遍历，当前遍历还没有正常技术，记录此时正在遍历的节点
		curNode = node; 
	},500);
}

// 设置某一目录下的元素显示情况
function childView(node, type){
	var display, aStr;
	if(type == 'hide'){
		display = 'none';
		aStr = '-';
	}else{
		display = 'block';
		aStr = '+';
	}
	for(var i = 0; i < node.childNodes.length; i++){
		var nName = node.childNodes[i].nodeName;
		if(nName != '#text'){
			// 改变该类别的a标签符号
			if(nName == 'A'){
				node.childNodes[i].style.display = 'inline-block';
				node.childNodes[i].innerHTML = aStr;
			}else{
				// 设置该类别下每个子类的display属性
				node.childNodes[i].style.display = display;
				if(type == 'show'
					&& node.childNodes[i].firstElementChild != null
					&& node.childNodes[i].firstElementChild.nodeName == 'A'){
				// 设置每个子类别下a标签的display属性
					node.childNodes[i].firstElementChild.style.display = 'inline-block';
				}
			}
		}
	}
}

function addNode(){
	if(curNode == null){
		alert('没有选中元素，无法确定插入位置');
		return;
	}
	var nodeStr = document.getElementById('nodeText').value.match(/[a-zA-Z0-9\u4e00-\u9fa5]+/g);
	if(nodeStr == null){
		alert('请输入要插入的节点的内容');
		return;
	}
	var newNode = document.createElement('div');
	newNode.innerHTML = nodeStr;
	newNode.style.display = 'block';
	// 如果当前节点没有子元素，则为其设置a标签，并将新节点添加为该节点的子元素
	if(!curNode.firstElementChild){
		curNode.innerHTML = '<a href="javascript:;">+</a>' + curNode.innerHTML;
		curNode.firstElementChild.style.display = 'inline-block';
		curNode.appendChild(newNode);
	}
	else{
		// 如果当前节点有子元素，判断当前节点的子元素显示情况，取消其隐藏状态
		if(curNode.firstElementChild.innerHTML == '-'){
			childView(curNode, 'show');
		}
		curNode.appendChild(newNode);
	}
}

function deleteNode(){
	if(curNode == null){
		alert('没有选中元素，无法确定要删除的元素');
		return;
	}
	if(curNode.id == 'product'){
		alert('根元素，不能删除');
		return;
	}
	var parent = curNode.parentNode;
	parent.removeChild(curNode);
	if(parent.lastElementChild.nodeName != 'DIV'){
		parent.removeChild(parent.lastElementChild);
	}
	curNode = null;
}

function init(){
	var oProduct = document.getElementById('product');
	// 显示第一层目录结构
	oProduct.style.display = 'block';
	childView(oProduct, 'show');
	// 设置目录显示和隐藏事件
	oProduct.onclick = function(e){
		clearInterval(timer);
		if(curNode != null){
			curNode.style.backgroundColor = 'white';
		}
		var e = e || window.event;
		if(e.target.nodeName == 'A'){
			if(e.target.innerHTML == '-'){
				childView(e.target.parentNode, 'show');
			}else{
				childView(e.target.parentNode, 'hide');
			}
		}else if(e.target.nodeName == 'DIV'){
			e.target.style.backgroundColor = 'green';
			curNode = e.target;
		}
	}


	var oMenu = document.getElementById('menu');
	oMenu.onclick = function(e){
		var e = e || window.event;
		switch(e.target.id){
			case 'serach':
				traverseShow();
				break;
			case 'addNode':
				addNode();
				break;
			case 'deleteNode':
				deleteNode();
				break;
		}
	}
}

window.onload = init;
