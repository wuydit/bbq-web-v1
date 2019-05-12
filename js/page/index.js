/**
 * Created by Corbie on 2019/4/6.
 */
let page = 0;
let size = 10;
let sort = {sort: 'createTime,desc'};


$(function () {
    if(typeof bbq_user != 'undefined' && bbq_user != null){
        $(".login").addClass("hidden");
        $(".register").addClass("hidden");

        $(".note-add").removeClass("hidden");
        $(".my").removeClass("hidden");
    }
    initPage();
    let documentBody = $("body");

    /**
     * 获取省份列表
     */
    $.get(URL_PROVINCES, function(data,status){
        data.forEach(v=>{
            let option = `<option value="${v.idNum}">${v.name}</option>`;
            $('#provinceList').append(option);
        })
    }, 'json');
    /**
     * 根据省份填充城市
     */
    $('#provinceList').change(function () {
        fillCityList(this.value);
        fillSchoolList(this.value);
    });
    fillCityList("110000");
    fillSchoolList("110000");
    function fillCityList(inNum){
        $("#cityList").empty();
        $('#cityList').append("<option value=\"\">不选</option>");
        $.get(URL_CITY_LIST,{idNumParent:inNum},function(data, status){
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.name}</option>`;
                $('#cityList').append(option);
            })
        }, 'json');
    }

    function fillSchoolList(inNum){
        $("#schoolList").empty();
        $('#schoolList').append("<option value=\"\">不选</option>");
        $.get(URL_SCHOOL_LIST,{areaId:inNum+"00"},function(data,status){
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.schoolName}</option>`;
                $('#schoolList').append(option);
            })
        }, 'json');
    }

    /**
     * 登录验证
     */
    $('#loginAuth').click(function(){
        console.log("login");
        let username = $("#loginUsername").val();
        let password = $("#loginPassword").val();
        $.ajax({
            type: 'POST',
            url: LOGIN_URL,
            dataType: "json",
            data: JSON.stringify({username:username,password:password}),
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                $('#loginModal').modal('hide');
                $.cookie(BBQ_USER_TOKEN_COOKIE, data.token, { expires: 0.083 });
                $.cookie(BBQ_USER_COOKIE, data.user, { expires: 0.083 });

                $(".login").addClass("hidden");
                $(".register").addClass("hidden");

                $(".note-add").removeClass("hidden");
                $(".my").removeClass("hidden");
            },
            error: function (data) {
                $('#auth_login_msg').empty();
                let msg =`<div class="alert alert-danger" role="alert">${data.message}</div>`;
                $('#auth_login_msg').append(msg);
            }
        });
    });


    /**
     * 添加更多
     * */
    $('.next-page').click(function(){
        let search = $("#search-val").val();
        let city = $("#cityList").val();
        let school = $("#schoolList").val();
        getNoteListPage(page++, size, sort,search,city,school)
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

    /**
     * 模糊搜索
     */
    documentBody.delegate("#search-submit","click",function(){
        let search = $("#search-val").val();
        let city = $("#cityList").val();
        let school =  $('#schoolList').val();
        $(".note-list").empty();
        getNoteListPage(page,size,sort,search,city,school);
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
const getNoteListPage = function (page, size, sort,search,city,school) {
    $.get(
        SERVER_URL + "api/note",
        {page: page, size: size, sort: sort, search:search, city:city, school:school},
        function (data) {
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
                                <span class="glyphicon glyphicon-thumbs-up notePraise  btn btn-info">${v.notePraise}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-down noteTrash  btn btn-danger">${v.noteTrash}</span>&nbsp&nbsp
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
                                <span class="glyphicon glyphicon-thumbs-up notePraise  btn btn-info">${v.notePraise}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-thumbs-down noteTrash btn btn-danger">${v.noteTrash}</span>&nbsp&nbsp
                                <span class="glyphicon glyphicon-fire noteReadCount">${v.noteReadCount}</span>&nbsp&nbsp
                            </div>
                        </div>
                    </div>`;
                $(".note-list").append(note_node);
            }
        });
    }
};


