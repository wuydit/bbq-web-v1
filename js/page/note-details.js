
const noteId = $.getUrlParam('noteId');
const URL_NOTE_GET_BY_ID = SERVER_URL + API + 'note/'+ noteId + '?token=' + token;

console.log("URL_NOTE_GET_BY_ID" + URL_NOTE_GET_BY_ID);
$(function () {
    initPage();
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
        url: SERVER_URL + 'api/note/' + id + '/noteReadCount?token=' + token,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            console.log("noteReadCount " + data.noteReadCount + "");
            $('#note-' + id).find('.noteTrash').text(data.noteTrash);
            $.growl({title: "成功", message: "踩!"});
        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

