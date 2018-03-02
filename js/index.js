//一开始加载音乐列表
window.onload = function(){
    getList();   
}
//获取音乐列表
function getList(){
    var url = 'http://222.198.39.16:8080/SpringMVCDemo2/getMusicFile.do';
    var xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.onload = getListSuccess;
    xhr.onerror = getListError;
    xhr.send();
}
//获取列表成功
function getListSuccess(evt){
    var data = JSON.parse(evt.target.responseText);
    var musicList = document.getElementById('musicList');
    data.map(e => (function(){
        var node = document.createElement('LI');
        node.innerHTML = e;
        musicList.appendChild(node);
    })())
}
//获取列表失败
function getListError(){
    alert('获取音乐列表失败');
}

//上传歌曲
function Upload(){
    var files = document.getElementById("file").files;
    var form = new FormData();
    var values = Object.values(files);
    values.map(e => form.append('file',e));

    var url = 'http://222.198.39.16:8080/SpringMVCDemo2/uploadMusicFile.do';
    var xhr = new XMLHttpRequest();
    xhr.open('post',url);
    xhr.send(form);
}