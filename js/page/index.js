/**
 * Created by Corbie on 2019/4/6.
 */
let page = 0;
let size = 10;
let sort = {sort: 'createTime,desc'};
// $.cookie('the_cookie', 'the_value', { expires: 7 });
// let user = $.cookie('the_cookie');
// console.log(user);
//首先判断cookie 若是 cookie 存储用户信息，以及token
// 根据登录信息去更新页面中的div展示 登录 和正在登录的信息等
//去渲染整个页面需要查询的数据 若用户存在查用户所在学校，否则查询数据库最新的几条动态
//分页查询


$(function () {
    initPage();
    let documentBody = $("body");


    /**
     * 注册按钮触发页面跳转
     * */
    $('.next-page').click(function(){
        getNoteListPage(page++, size, sort)
    });

    /**
     * 跳转到详情页
     */
    documentBody.delegate(".note-url","click",function(){
        let id = $(this).parent().parent().attr("data-note-id");
        window.location.href = "note-details.html?noteId=" + id;
    });

    /**
     * 点赞
     */
    documentBody.delegate(".notePraise","click",function(){
        let id = $(this).parent().parent().parent().attr("data-note-id");
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'api/note/'+id+'/notePraise?token='+token,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                console.log("notePraise " + data.notePraise + "");
                $('#note-'+id).find('.notePraise').text(data.notePraise);
                $.growl({title: "成功", message: "点赞!"});
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

    // $(document).on("click",".noteTrash", function() {
    //     let id = $(this).parent().parent().parent().attr("data-note-id");
    //         $.ajax({
    //             type: 'GET',
    //             url: SERVER_URL + 'api/note/'+id+'/noteTrash?token='+token,
    //             dataType: "json",
    //             contentType: "application/json;charset=UTF-8",
    //             success: function (data) {
    //                 console.log("noteTrash " + data.noteTrash + "");
    //                 $('#note-'+id).find('.noteTrash').text(data.noteTrash);
    //                 $.growl({title: "成功", message: "踩!"});
    //             },
    //             error: function (data) {
    //                 $.growl.error({title: "发生错误", message: '服务器错误。'});
    //             }
    //         });
    // });
    /**
     * 踩
     */
    documentBody.delegate(".noteTrash","click",function(){
      let id = $(this).parent().parent().parent().attr("data-note-id");
        $.ajax({
            type: 'GET',
            url: SERVER_URL + 'api/note/'+id+'/noteTrash?token='+token,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                console.log("noteTrash " + data.noteTrash + "");
                $('#note-'+id).find('.noteTrash').text(data.noteTrash);
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
    getNoteListPage(page, size, sort);
};

/**
 * 获取列表值
 */
const getNoteListPage = function (page, size, sort) {
    console.log("getNoteListPage 获取列表值.");
    console.log("get" + SERVER_URL + "api/note");
    $.get(
        SERVER_URL + "api/note",
        {page: page, size: size, sort: sort},
        function (data) {
            console.log("return " + data + "");
            addNoteList(data);
        });
};


/**
 * 拿到note列去填充
 * @param data json 数据列
 * */
const addNoteList = function (data) {
    if (!!data && data.content && data.content.length > 0) {
        data.content.forEach(v => {
            if (!v.isAnonymous) {
                let note_node = `<div id='note-${v.id}' data-note-id='${v.id}' class="col-md-4 note">
                        <div class="panel panel-default ">
                            <div class="panel-heading note-url">
                                ${v.noteTitle}
                            </div>
                            <div class="panel-body note-url">
                                ${v.noteAbstract}
                            </div>
                            <div class="panel-footer">
                                <a class="" target="_blank" href=\\\\"/u/d7184de1da60\\\\">${v.user.username}</a>
                                <span  aria-hidden="true">${v.noteSchool.schoolName}</span>&nbsp&nbsp
                                <span  aria-hidden="true">${v.noteCity.name}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-up notePraise  btn btn-info" aria-hidden="true">${v.notePraise}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-down noteTrash  btn btn-danger" onclick="onclickNoteTrash(this)">${v.noteTrash}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-fire noteReadCount">${v.noteReadCount}</span>&nbsp&nbsp
                            </div>
                        </div>
                    </div>`;
                $(".note-list").append(note_node);
            } else {
                let note_node = `<div id='note-${v.id}' data-note-id='${v.id}' class="col-md-4 note">
                        <div class="panel panel-default ">
                            <div class="panel-heading text-center note-url">
                                ${v.noteTitle}
                            </div>
                            <div class="panel-body note-url">
                                ${v.noteAbstract}
                            </div>
                            <div class="panel-footer">
                                <span  aria-hidden="true">${v.noteSchool.schoolName}</span>&nbsp&nbsp
                                <span  aria-hidden="true">${v.noteCity.name}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-up notePraise" aria-hidden="true">${v.notePraise}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-down noteTrash">${v.noteTrash}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-fire noteReadCount">${v.noteReadCount}</span>&nbsp&nbsp
                            </div>
                        </div>
                    </div>`;
                $(".note-list").append(note_node);
            }
        });
    }
};


