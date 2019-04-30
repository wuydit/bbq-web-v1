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


    /**
     * 注册按钮触发页面跳转
     * */


});
/**
 * 页面初始化
 * */
const initPage = function () {
    let page = 0;
    let size = 10;
    let sort = {sort: 'createTime,desc'};
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
    console.log("!!data" + !!data);
    console.log("data.content" + data.content);
    console.log("data.content.length" + data.content.length);
    if (!!data && data.content && data.content.length > 0) {
        data.content.forEach(v => {
            if (!v.isAnonymous) {
                let note_node = `<div id='note-${v.id}' data-note-id='${v.id}'>
                                    <div class="content">
                                        <a class="title" target="_blank" href="/p/c9daa2f30186\\">${v.noteTitle}</a>
                                        <p class="abstract">${v.noteAbstract}</p>
                                        <div class="meta">
                                            <a class="nickname" target="_blank" href=\\"/u/d7184de1da60\\">${v.user.username}</a>
                                            <a class="nickname" target="_blank" href=\\"/u/d7184de1da60\\">${v.user.noteSchool}</a>
                                            <a class="nickname" target="_blank" href=\\"/u/d7184de1da60\\">${v.user.noteCity}</a>
                                            <a target="_blank" href="/p/c9daa2f30186#comments\\">
                                            <span><i class="iconfont ic-list-like"></i>${v.notePraise}</span>
                                            <span><i class="iconfont ic-list-like"></i>${v.noteTrash}</span>
                                            <span><i class="iconfont ic-list-like"></i>${v.noteReadCount}</span>
                                         </div>
                                        </div>
                                 </div>`;
                $(".note-list").append(note_node);
            } else {
                let note_node = `<div  id='note-${v.id}' data-note-id='${v.id}'>
                                    <div class="content">
                                        <a class="title" target="_blank" href="/p/c9daa2f30186\\">${v.noteTitle}</a>
                                        <p class="abstract">${v.noteAbstract}</p>
                                        <div class="meta">
                                            <a target="_blank" href="/p/c9daa2f30186#comments\\">
                                            <span><i class="iconfont ic-list-like"></i>${v.notePraise}</span>
                                            <span><i class="iconfont ic-list-like"></i>${v.noteTrash}</span>
                                            <span><i class="iconfont ic-list-like"></i>${v.noteReadCount}</span>
                                         </div>
                                        </div>
                                 </div>`;
                $(".note-list").append(note_node);
            }
        });
    }
};


