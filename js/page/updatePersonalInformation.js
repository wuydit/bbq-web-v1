$(function () {
    $("#update_Personal_Information_submit").click(function(){
        let phone = $("#phone").val();
        let username = $("#username").val();



        $.ajax({
            type: 'PUT',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization","Bearer " + token);
            },
            data:JSON.stringify({
                username:username,
                phone:phone,
                id:bbq_user_id
            }),
            url: SERVER_URL + 'api/user/update',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                window.location.href = "index.html";
            },
            error: function (data) {
                $("#update_Personal_Information").empty();
                let msg =`<div class="alert alert-danger" role="alert">${data.responseJSON.message}</div>`;
                $('#update_Personal_Information').append(msg);
            }
        });
    });

});