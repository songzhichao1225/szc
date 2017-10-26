<script>
window.onload = function(){
	document.onclick = function(e){
		var ev = e || event;
		var iTarget = ev.target || ev.srcElement;
		if(iTarget.nodeName =='LI'){
			ajax({
				url:'http://localhost:1224',
				type:'get',
				data:{
					titleName:iTarget.innerHTML
				},
				success:function(data){
					textWZ.innerHTML = data;
					textWZ.style.display = 'block';
					gb.style.display = 'block';
				}
			})
		}

	};
	var li=document.querySelectorAll('#ul>li')
	for(var i=0;i<li.length;i++){
		li[i].onclick=function () {
			this.style.display='none'
		}
	}

	


	ajax({
		'url':'http://localhost:1223',
		'type':'get',
		'success':function(data){
			if(data == '')return;
			function toString(data,need){
				if(data.indexOf(need)!=-1){
					var data = data.replace(need,'"');
					return toString(data,need);
				}
				else{
					return data;
				}
			}
			var s = toString(data,'’');
			var b = toString(s,'‘');
			var arr = eval('('+b+')');


			for(var i = 0;i < arr.length;i++){
				var oLi = document.createElement('li');
				oLi.innerHTML = arr[i];
				ul.appendChild(oLi)
			}
		}
	})


	btn.onclick = function(){

		var allLi = ul.children;
		for(var i = 0;i < allLi.length;i++){
			if(titText.value == allLi[i].innerHTML){
				alert('重复了');
				return;
			}
		}

		ajax({
			url:'http://localhost:1222',
			type:'get',
			data:{
				titleName:titText.value
			},
			success:function(data){
				if(data == '成功了'){
					var oLi = document.createElement('li');
					oLi.innerHTML = titText.value;
					ul.appendChild(oLi);
				}
			}
		})
	}

	function ajax(json){
	if(window.XMLHttpRequest){
		var ajax = new XMLHttpRequest();
	}
	else{
		var ajax = new ActiveXObject( "Microsoft.XMLHTTP" );
	}

	if(json.type=='get'){
		ajax.open('get',json.url+'?'+JsonToString(json.data),true);
		ajax.send();
	}
	else if(json.type=='post'){
		ajax.open('post',json.url,true);
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(JsonToString(json.data));
	}
	

ajax.onreadystatechange = function(){
		if(ajax.readyState == 4){
			if(ajax.status>=200 && ajax.status<300 || ajax.status == 304){
				json.success(ajax.responseText);

			}
			else{
				json.error && json.error();
			}
		};
	};
	function JsonToString(json){
		var arr = [];
		for(var i in json){
			arr.push(i+'='+json[i]);
		};
		return arr.join('&');
	}
}
}

	
</script>