$(function () {
    $("#updatePassword_submit").click(function(){
        $(".verification-password-check").addClass("hidden");
        let password = $("#password").val();
        let newPassword = $("#newPassword").val();
        let nextPassword = $("#nextPassword").val();
        if(newPassword ==null || nextPassword == null || nextPassword !== newPassword){
            $(".verification-password-check").removeClass("hidden");
            return;
        }
        $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization","Bearer " + token);
            },
            url: SERVER_URL + 'api/users/updatePass/'+newPassword,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                $.removeCookie(BBQ_USER_TOKEN_COOKIE);
                $.removeCookie(BBQ_USER_COOKIE);
                $.growl({title: "成功", message: "密码修改成功!"});
                window.location.href = "index.html";
            },
            error: function (data) {
                $("#update_password_msg").empty();
                let msg =`<div class="alert alert-danger" role="alert">${data.responseJSON.message}</div>`;
                $('#update_password_msg').append(msg);
            }
        });
    });

});