//返回的音乐列表
var MusicList;
//当前播放的音乐下标
var index = 0;
//音乐资源路径
var path = '../easy/music/';
//audio source
var music;
//audio
var audio;
//正在播放音乐名字
var musicName;

window.onload = function(){
    //渐显标题
    // $('#title').fadeIn(3000);
    $('#title').textFx({
        type: 'fadeIn'
    });

    //请求音乐列表
    $.ajax({
        url:'http://localhost:3000/music',
        type:'GET',
        dataType:'json',
        success:function(data){
            var list = $('#list');
            MusicList = data;
            data.map(function(e){
                list.append('<li>' + e.title + '</li>');
            });

            $('#list li:nth-child(' + index+1 + ')').addClass('playing');
            //给每个li增加一个点击事件
            $('ol#list').on('click','li',function(){
                changeGif($(this).index());

                music.src = path + $(this).text() + ".mp3";
                //换了音乐资源后需重新加载
                audio.load();
                
                index = $(this).index();
                changeTitle();
            });

            //切换网页标题
            changeTitle();

            //加载第一个音乐源
            music = document.createElement("SOURCE");
            music.src = path + MusicList[index].title + '.mp3';
            audio = $('audio').get(0);
            audio.append(music);
            //加上音乐放完的监听器
            audio.addEventListener('ended',endHandle,false);

            //网页标题滚动
            setInterval(function(){
                musicName = musicName.substring(1,musicName.length) + musicName.substring(0,1);
                document.title = musicName;
            },500);
        },
        error:function(){
            console.log('错误');
        }
    });

    //音乐放完
    function endHandle(){
        changeGif();

        index = index===MusicList.length-1?0:index+1;
        music.src = path + MusicList[index].title + ".mp3";
        //换了音乐资源后需重新加载
        audio.load();
        
        //切换网页标题
        changeTitle();
    }
}

//切换显示音乐列表
function toggle(){
    $(".MusicList").toggleClass("open");
} 

//切换网页标题
function changeTitle(){
    musicName = MusicList[index].title + " ";
}

//变换gif和颜色
function changeGif(current){
    var newIndex = current!==undefined?current+1:(index===MusicList.length-1?1:index + 2);
    var oldIndex = index + 1;
    //移除跳动的gif
    $('#list li:nth-child(' + oldIndex + ')').removeClass('playing');
    //加上跳动的gif和换颜色
    $('#list li:nth-child(' + newIndex + ')').addClass('playing');
}