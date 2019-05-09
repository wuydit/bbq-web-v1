
$(function () {
    /**
     * 获取省份列表
     */
    $.get(URL_PROVINCES, function(data,status){
        data.forEach(v=>{
            let option = `<option value="${v.idNum}">${v.name}</option>`;
            $('#provinceList').append(option);
        })
    }, 'json');

    fillCityList("110000");
    fillSchoolList("110000");
    /**
     * 文章内容组件
     */
    $('.summer-note').summernote({
        height: 200,
        tabsize: 2,
        lang: 'zh-CN'
    });
    /**
     * 文章发布
     */
    $('#note_add_submit').click(function () {
        $('#note_add_submit').addClass('disabled');
        let noteTitle =  $('#noteAddInputTitle').val();
        let noteAbstract = $('#noteAbstract').val();
        let noteContent = $('.note-editable').html();
        if(isSensitiveWord(noteTitle)){
            $.growl.error({title: "标题敏感词", message: '请不要输入相关敏感词。<br>请修改后重新提交。'});
            $('#noteAddInputTitle').val(replaceSensitiveWord(noteTitle));
            return false;
        }
        if(isSensitiveWord(noteAbstract)){
            $.growl.error({title: "简介敏感词", message: '请不要输入相关敏感词。<br>请修改后重新提交。'});
            $('#noteAbstract').val(replaceSensitiveWord(noteAbstract));
            return false;
        }
        if(isSensitiveWord(noteContent)){
            $.growl.error({title: "正文敏感词", message: '请不要输入相关敏感词。<br>请修改后重新提交。'});
            $('.note-editable').html(replaceSensitiveWord(noteContent));
            return false;
        }

        $.ajax({
            type: 'POST',
            url: URL_NOTE_ADD,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                noteTitle: noteTitle,
                noteAbstract: noteAbstract,
                isAnonymous: $('#isAnonymous').val(),
                noteContent: noteContent,
                noteCity: {id: $('#cityList').val()},
                noteSchool:{id: $('#schoolList').val()}
            }),
            success: function (data) {
                $.growl({title: "成功", message: "页面准备跳转!"});
                //成功则跳转
                window.location.href = "note-details.html?noteId=" + data.id;
            },
            error: function (data) {
                $('#note_add_submit').removeClass('disabled');
                $.growl.error({
                    title: "发生错误",
                    message: '服务器错误。<br> 时间:'+data.responseJSON.timestamp+'<br>'+data.responseJSON.message});
            }
        });
    });
    /**
     * 根据省份填充城市
     */
    $('#provinceList').change(function () {
        fillCityList(this.value);
        fillSchoolList(this.value);
    });

    function fillCityList(inNum){
        $("#cityList").empty();
        $.get(URL_CITY_LIST,{idNumParent:inNum},function(data, status){
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.name}</option>`;
                $('#cityList').append(option);
            })
        }, 'json');
    }

    function fillSchoolList(inNum){
        $("#schoolList").empty();
        $.get(URL_SCHOOL_LIST,{areaId:inNum+"00"},function(data,status){
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.schoolName}</option>`;
                $('#schoolList').append(option);
            })
        }, 'json');
    }



});

function isSensitiveWord(word){
    let flag = false;
    $.ajax({
        type: 'GET',
        url: URL_IS_SENSITIVE_WORD,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: {word:word},
        async: false,
        success: function (data) {
            console.log("当前字符串有敏感词"+data.isSensitiveWord);
            flag = !!data.isSensitiveWord ;
        },
        error: function () {
            $.growl.error({title: "发生错误", message: '服务器错误。<br>请稍后提交。'});
        }
    });
    return flag;
}
function replaceSensitiveWord(word){
    let result = word;
    $.ajax({
        type: 'GET',
        url: URL_REPLACE_SENSITIVE_WORD,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: {word:word},
        async: false,
        success: function (data) {
            console.log("替换后敏感词"+data.msg);
            result =  data.msg;
        },
        error: function () {
            $.growl.error({title: "发生错误", message: '服务器错误。<br>请稍后提交。'});
        }
    });
    return result;
}
