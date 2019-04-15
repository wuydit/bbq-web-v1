/**
 * Created by Corbie on 2019/4/6.
 */
let page = 0;
let size = 10;
let sort = {sort:'createTime,desc'};
// $.cookie('the_cookie', 'the_value', { expires: 7 });
// let user = $.cookie('the_cookie');
// console.log(user);
//首先判断cookie 若是 cookie 存储用户信息，以及token
// 根据登录信息去更新页面中的div展示 登录 和正在登录的信息等
//去渲染整个页面需要查询的数据 若用户存在查用户所在学校，否则查询数据库最新的几条动态
//分页查询


$(function(){
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
    let sort = {sort:'createTime,desc'};
    getNoteListPage(page,size,sort);

};

/**
 * 获取列表值
 */
const getNoteListPage = function (page, size, sort) {
    console.log("getNoteListPage 获取列表值.");
    console.log("get"+SERVER_URL + "api/note");
    $.get(
        SERVER_URL + "api/note",
        {page: page, size: size, sort: sort},
        function (data) {
            console.log("return "+data + "");
            addNoteList(data);
        });
};

/**
 * 拿到note列去填充
 * @param data json 数据列
 * */
const addNoteList = function (data) {
    console.log("!!data" + !!data);
    console.log("data.content" +data.content);
    console.log("data.content.length" + data.content.length);
    if(!!data && data.content && data.content.length>0){
        data.content.forEach(v =>{
            if(!v.isAnonymous){
                $(".note-list").append("<li id='note-"+v.id+"' data-note-id='"+v.id+"' class=\"\">\n" +
                    "                        <div class=\"content\">\n" +
                    "                            <a class=\"title\" target=\"_blank\" href=\"/p/c9daa2f30186\">"+v.noteTitle+"</a>\n" +
                    "                            <p class=\"abstract\">\n"+ v.noteAbstract+"\n</p>\n" +
                    "                            <div class=\"meta\">\n" +
                    "                                <a class=\"nickname\" target=\"_blank\" href=\"/u/d7184de1da60\">"+v.user.username+"</a>\n" +
                    "                                <a class=\"nickname\" target=\"_blank\" href=\"/u/d7184de1da60\">"+v.user.noteSchool+"</a>\n" +
                    "                                <a class=\"nickname\" target=\"_blank\" href=\"/u/d7184de1da60\">"+v.user.noteCity+"</a>\n" +
                    "                                <a target=\"_blank\" href=\"/p/c9daa2f30186#comments\">\n" +
                    "                                    <i class=\"iconfont ic-list-comments\"></i>"+v.notePraise+"\n</a>" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.notePraise+"</span>\n" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.noteTrash+"</span>\n" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.noteReadCount+"</span>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </li>");
            }else {
                $(".note-list").append("<li id='note-"+v.id+"' data-note-id='"+v.id+"' class=\"\">\n" +
                    "                        <div class=\"content\">\n" +
                    "                            <a class=\"title\" target=\"_blank\" href=\"/p/c9daa2f30186\">"+v.noteTitle+"</a>\n" +
                    "                            <p class=\"abstract\">\n"+ v.noteAbstract+"\n</p>\n" +
                    "                            <div class=\"meta\">\n" +
                    "                                <a target=\"_blank\" href=\"/p/c9daa2f30186#comments\">\n" +
                    "                                    <i class=\"iconfont ic-list-comments\"></i> 74\n</a>\n" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.notePraise+"</span>\n" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.noteTrash+"</span>\n" +
                    "<span><i class=\"iconfont ic-list-like\"></i>"+v.noteReadCount+"</span>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </li>");
            }

        });
    }
};


