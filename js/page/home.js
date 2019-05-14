let userId = $.getUrlParam('userId');

let page = 0;
let size = 10;
let sort = {sort: 'createTime'};
let socket;
$(function () {
    if(userId == null || typeof userId == "undefined"){
        userId = bbq_user_id;
        $(".messages_nav").removeClass("hidden");
    }else {
        console.log("private-letter");
        $(".private-letter").removeClass("hidden");
    }

    let documentBody = $("body");
    initPage();

    /**
     * 跳转到详情页
     */
    documentBody.delegate(".note-url","click",function(){
        let id = $(this).attr("data-note-id");
        window.location.href = "note-details.html?noteId=" + id;
    });

    $('.note-btn').click(function () {
        $('.profile_nav').removeClass("active");
        $('.messages_nav').removeClass("active");
        $('.note_nav').addClass("active");
        $('.page').empty();
        noteListPage();
    });

    $('.profile-btn').click(function () {
        $('.note_nav').removeClass("active");
        $('.messages_nav').removeClass("active");
        $('.profile_nav').addClass("active");
        $('.page').empty();
        profilePage();

    });

    $('.messages-btn').click(function () {
        $('.note_nav').removeClass("active");
        $('.profile_nav').removeClass("active");
        $('.messages_nav').addClass("active");
        $('.page').empty();

        messagesListPage();

        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else {
            console.log("您的浏览器支持WebSocket");
            let socketUrl = SERVER_SOCKET_URL +"/websocket/"  + token;
            console.log(socketUrl);
            socket = new WebSocket(socketUrl);}
        //打开事件
        socket.onopen = function() {
            console.log("websocket已打开");
            //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        socket.onmessage = function(msg) {
            console.log(msg.data);
            //发现消息进入    开始处理前端触发逻辑
        };
        //关闭事件
        socket.onclose = function() {
            console.log("websocket已关闭");
        };
        //发生了错误事件
        socket.onerror = function() {
            console.log("websocket发生了错误");
        };

    });

});

function sendMessage() {
    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else {
        console.log("您的浏览器支持WebSocket");
        console.log('[{"toUserId":"'+$("#toUserId").val()+'","contentText":"'+$("#contentText").val()+'"}]');
        socket.send('[{"toUserId":"'+$("#toUserId").val()+'","contentText":"'+$("#contentText").val()+'"}]');
    }
}

const initPage = function (){
    console.log("userID:" + userId);
    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/user/' + userId,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            let hidden ="hidden";
            if( $.getUrlParam('userId') != null){
                hidden="";
            }
            let dom = `<div>
                            <h1 class="col-md-4">${data.username}</h1>
                        </div>
                        <div class="col-md-12">
                        <div class="col-md-4">
                         <span>文章：${data.noteSize}</span>
                         <span>字数：${data.noteContentSize}</span>
                        </div class="private-letter">
                            <div class="private-letter-btn btn-info btn col-md-2 ${hidden}">私信</div>
                        </div>
                        `;
            $('.user-info').empty();
            $('.user-info').append(dom);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
    $('.note_nav').addClass("active");

    noteListPage();
};


const noteListPage = function () {
    console.log("userID:" + userId);
    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/note/user/' + userId,
        data:{page: page, size: size, sort: sort},
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            addNoteList(data);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};


const profilePage = function () {
    console.log("userID:" + userId);
    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/dynamic/user/' + userId,
        data:{page: page, size: size, sort: sort},
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            addProfileList(data);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

const messagesListPage = function () {
    console.log("userID:" + userId);
    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/getPrivateLetters',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            addMessagesList(data);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

const addNoteList = function (data) {
    if (!!data && data.content && data.content.length > 0) {
        data.content.forEach(v => {
                let note_node = `<div id='note-${v.id}'>
                        <div class="panel panel-default ">
                            <div class="panel-heading note-url"  data-note-id='${v.id}'>
                                ${v.noteTitle}
                            </div>
                            <div class="panel-body note-url"  data-note-id='${v.id}'>
                                ${v.noteAbstract}
                            </div>
                            <div class="panel-footer">
                                <span  aria-hidden="true">${v.noteSchool.schoolName}</span>&nbsp&nbsp
                                <span  aria-hidden="true">${v.noteCity.name}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-up">${v.notePraise}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-down">${v.noteTrash}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-fire">${v.noteReadCount}</span>&nbsp&nbsp
                            </div>
                        </div>
                    </div>`;
                $(".page").append(note_node);
        });
    }
};


const addProfileList = function (data) {
    if (!!data && data.length > 0) {
        data.forEach(v => {
            let dateTime = formatTime(v.createTime,'Y/M/D h:m:s');
            let type =typeProfile(v.type);
            let Profile_node = `<div id='profile-${v.id}' data-profile-id='${v.id}'>
                        <div class="panel panel-default ">
                            <div class="panel-heading">
                                ${type}
                            </div>
                            <div class="panel-body note-url" data-note-id = "${v.note.id}">
                                ${v.note.noteTitle}
                            </div>
                            <div class="panel-footer">
                                  ${dateTime}
                            </div>
                        </div>
                    </div>`;
            $(".page").append(Profile_node);
        });
    }
};

const addMessagesList = function (data) {
    if (!!data && data.length > 0) {
        data.forEach(v => {
            let dateTime = formatTime(v.createTime,'Y/M/D h:m:s');
            let Messages_node = `<div id='user-${v.id}''>
                        <div class="panel panel-default ">
                            <div class="panel-heading">
                             ${v.fromUser.username}说:
                            </div>
                            <div class="panel-body">
                                ${v.msg}
                            </div>
                             <div class="panel-footer">
                                  ${dateTime}
                            </div>
                        </div>
                    </div>`;
            $(".page").append(Messages_node);
        });
    }
};

function typeProfile(type) {
    switch (type) {
        case 1:
            return "踩";
        case 2:
            return "阅读";
        case 3:
            return "关注";
        case 4:
            return "回复";
        case 5:
            return "点赞";
    }
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number,format) {
    let formateArr  = ['Y','M','D','h','m','s'];
    let returnArr   = [];
    let date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (let i in returnArr)
    {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

//数据转化
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}