var tags = [];
var hobbys = [];
function tagInsert(){
	var oTagSwap = document.getElementById('tag-swap');
	var tag = document.getElementById('tag-input').value;
	if(tag == ''){
		alert('输入不能为空，请输入');
		return;
	}
	if(tags.indexOf(tag) === -1){
		if(oTagSwap.childNodes.length === 10){
			oTagSwap.removeChild(oTagSwap.firstChild);
			tags.shift();
		}
		var newNode = document.createElement('span');
		newNode.className = 'label-sty tag-sty';
		newNode.innerHTML = tag;
		newNode.onmouseover = function(){
			this.innerHTML = '点击删除' + this.innerHTML;
			this.style['background-color'] = 'red';
		}
		newNode.onmouseout = function(){
			this.innerHTML = this.innerHTML.replace('点击删除', '');
			this.style['background-color'] = '#A1D1E0';
		}
		newNode.onclick = function(){
			this.parentNode.removeChild(this);
			var index = tags.indexOf(this.innerHTML);
			tags.splice(index, 1);
		}
		oTagSwap.appendChild(newNode);
		tags.push(tag);
	}
}

function hobbyInsert(){
	var oHobbySwap = document.getElementById('hobby-swap');
	var pattern = /[a-zA-Z0-9\u4e00-\u9fa5]+/g;
	var elements = (document.getElementById('hobby-input').value).match(pattern);
	if(elements === null){
		alert('输入不能为空，请输入');
		return;
	}
	for(var i = 0; i < elements.length; i++){
		if(hobbys.indexOf(elements[i]) === -1){
			if(oHobbySwap.childNodes.length === 10){
				oHobbySwap.removeChild(oHobbySwap.firstChild);
				hobbys.shift();
			}
			var newNode = document.createElement('span');
			newNode.className = 'label-sty hobby-sty';
			newNode.innerHTML = elements[i];
			oHobbySwap.appendChild(newNode);
			hobbys.push(elements[i]);
		}
	}
}

function init(){
	document.getElementById('hobby-btn').onclick = hobbyInsert;
	document.getElementById('tag-input').onkeypress = function(){
		if(event.keyCode == 13){
			tagInsert();
		}
	}
}

window.onload = init;
