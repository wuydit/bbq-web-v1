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
            // $('#noteAddInputTitle').val(replaceSensitiveWord(noteTitle));
            return false;
        }
        if(isSensitiveWord(noteAbstract)){
            $.growl.error({title: "简介敏感词", message: '请不要输入相关敏感词。<br>请修改后重新提交。'});
            $('#noteAddInputTitle').val(replaceSensitiveWord(noteAbstract));
            return false;
        }
        if(isSensitiveWord(noteContent)){
            $.growl.error({title: "正文敏感词", message: '请不要输入相关敏感词。<br>请修改后重新提交。'});
            $('#noteAddInputTitle').val(replaceSensitiveWord(noteContent));
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
            success: function () {
                $.growl({title: "成功", message: "页面准备跳转!"});
                //成功则跳转
            },
            error: function () {
                $('#note_add_submit').removeClass('disabled');
                $.growl.error({title: "发生错误", message: '服务器错误。<br>请稍后提交。'});
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

    function isSensitiveWord(word){
        $.ajax({
            type: 'GET',
            url: URL_IS_SENSITIVE_WORD,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: {word:word},
            async: false,
            success: function (data) {
                console.log("当前字符串有敏感词"+data.isSensitiveWord);
                return !!data.isSensitiveWord;
            },
            error: function () {
                $.growl.error({title: "发生错误", message: '服务器错误。<br>请稍后提交。'});
                return true;
            }
        });
        console.log(1);
    }
    function replaceSensitiveWord(word){
        $.get(URL_REPLACE_SENSITIVE_WORD,{word:word},function(data,status){
            console.log("替换后敏感词"+data.msg);
            return data.msg;
        }, 'json');
    }

});
