$(function () {
    /**
     * 获取省份列表
     */
    $.get(URL_PROVINCES, function(data,status){
        console.log("获取到省份列表状态"+status);
        console.log("获取到省份列表"+data);
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
        $.ajax({
            type: 'POST',
            url: URL_NOTE_ADD,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                noteTitle: $('#noteAddInputTitle').val(),
                noteAbstract: $('#noteAbstract').val(),
                isAnonymous: $('#isAnonymous').val(),
                noteContent: $('.note-editable').html(),
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
            console.log("获取到城市列表状态"+status);
            console.log("获取到城市列表"+data);
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.name}</option>`;
                $('#cityList').append(option);
            })
        }, 'json');
    }

    function fillSchoolList(inNum){
        $("#schoolList").empty();
        $.get(URL_SCHOOL_LIST,{areaId:inNum+"00"},function(data,status){
            console.log("获取到学校列表状态"+status);
            console.log("获取到学校列表"+data);
            data.forEach(v=>{
                let option = `<option value="${v.id}">${v.schoolName}</option>`;
                $('#schoolList').append(option);
            })
        }, 'json');
    }
});
