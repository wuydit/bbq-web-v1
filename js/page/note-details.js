
const noteId = $.getUrlParam('noteId');
const URL_NOTE_GET_BY_ID = SERVER_URL + API + 'note/'+ noteId + '?token=' + token;

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
            url: SERVER_URL + 'api/note/'+noteId+'/notePraise?token='+token,
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
            url: SERVER_URL + 'api/note/'+noteId+'/noteTrash?token='+token,
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
    // documentBody.delegate(".noteTrash","click",function(){
    //     $.ajax({
    //         type: 'GET',
    //         url: SERVER_URL + 'api/note/'+noteId+'/noteTrash?token='+token,
    //         dataType: "json",
    //         contentType: "application/json;charset=UTF-8",
    //         success: function (data) {
    //             console.log("noteTrash " + data.noteTrash + "");
    //             $('#note-'+id).find('.noteTrash').text(data.noteTrash);
    //             $.growl({title: "成功", message: "踩!"});
    //         },
    //         error: function (data) {
    //             $.growl.error({title: "发生错误", message: '服务器错误。'});
    //         }
    //     });
    // });
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
        url: SERVER_URL + 'api/note/' + noteId + '/noteReadCount?token=' + token,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            console.log("noteReadCount " + data.noteReadCount + "");
            $('.noteReadCount').text(data.noteReadCount);
            $.growl({title: "成功", message: "踩!"});
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

