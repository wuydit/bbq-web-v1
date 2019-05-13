
const noteId = $.getUrlParam('noteId');
const URL_NOTE_GET_BY_ID = SERVER_URL + API + 'note/'+ noteId;

console.log("URL_NOTE_GET_BY_ID" + URL_NOTE_GET_BY_ID);
$(function () {
    initPage();
    let documentBody = $("body");
    /**
     * 点赞
     */
    documentBody.delegate(".notePraise","click",function(){
        $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization","Bearer " + token);
            },
            url: SERVER_URL + 'api/note/'+noteId+'/notePraise',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                console.log("notePraise " + data.notePraise + "");
                $('.notePraise').text(data.notePraise);
                $.growl({title: "成功", message: "点赞!"});
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

    /**
     * 踩
     */
    $(".noteTrash").click(function(){
        $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization","Bearer " + token);
            },
            url: SERVER_URL + 'api/note/'+noteId+'/noteTrash',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                console.log("noteTrash " + data.noteTrash + "");
                $('.noteTrash').text(data.noteTrash);
                $.growl({title: "成功", message: "踩!"});
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

    /**
     * 回复
     */
    $(".reply-btn").click(function(){
        let noteContent = $("#reply_val").val();
        $.ajax({
            type: 'POST',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization","Bearer " + token);
            },
            url: SERVER_URL + 'api/talk',
            data: JSON.stringify({noteContent:noteContent,note:{id:noteId}}),
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                TalkListRefresh();
                $.growl({title: "成功", message: "踩!"});
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

});

/**
 * 页面初始化
 * */
const initPage = function () {

    $.get(URL_NOTE_GET_BY_ID,function(data){
        $('.title').html(data.noteTitle);
        $('.show-content').html(data.noteContent);
        $('.notePraise').text(data.notePraise);
        $('.noteTrash').html(data.noteTrash);


    }, 'json');

    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/note/' + noteId + '/noteReadCount',
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            console.log("noteReadCount " + data.noteReadCount + "");
            $('.noteReadCount').text(data.noteReadCount);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });

    TalkListRefresh();
};

const TalkListRefresh = function () {
    $.ajax({
        type: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization","Bearer " + token);
        },
        url: SERVER_URL + 'api/talk/note/' + noteId,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            addTalkList(data);
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

const addTalkList = function (data) {
    $(".reply-list").empty();
    if (!!data && data.content && data.content.length > 0) {
        data.content.forEach(v => {
            let dateTime = formatTime(v.createTime,'Y/M/D h:m:s');
            $(".reply-list").append(` <div class="panel panel-default">
            <div class="panel-body">
                <div><a href="${v.user.id}">${v.user.username}</a></div>
                <div>${v.noteContent}</div>
                <div class="col-md-3">${dateTime}</div>
            </div>
        </div>`);
        });
    }
};
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
