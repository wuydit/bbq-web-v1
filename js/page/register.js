$(function () {

    $(".verification-username").click(function () {
        let username = $("#username").val();
        $(".verification-username-danger").addClass("hidden");
        $(".verification-username-success").addClass("hidden");
        $.get(REGISTER_IS_USERNAME ,{username:username} ,function(data,status){
            if(data.isOccupy){
                $(".verification-username-danger").removeClass("hidden");
            }else {
                $(".verification-username-success").removeClass("hidden");
            }
        }, 'json');
    });

    $(".verification-email").click(function () {
        let email = $("#email").val();
        $(".verification-email-danger").addClass("hidden");
        $(".verification-email-success").addClass("hidden");
        $(".verification-email-check").addClass("hidden");
        if(checkEmail(email)){
            $(".verification-email-check").removeClass("hidden");
            return;
        }
        $.get(REGISTER_IS_MAIL,{mail:email},function(data,status){
            if(data.isOccupy){
                $(".verification-email-danger").removeClass("hidden");
            }else {
                $(".verification-email-success").removeClass("hidden");
            }
        }, 'json');
    });
    $(".send-code").click(function () {
        let email = $("#email").val();
        if(checkEmail(email)){
            $(".verification-email-check").removeClass("hidden");
            return;
        }
        $(".verification-email-danger").addClass("hidden");
        $(".verification-email-success").addClass("hidden");
        $(".send-code-success").addClass("hidden");
        $(".send-code-danger").addClass("hidden");
        $.get(REGISTER_SEND_MAIL,{mail:email},function(data,status){
            if(data.isSend){
                $(".send-code-success").removeClass("hidden");
            }else {
                $(".send-code-danger").removeClass("hidden");
            }
        }, 'json');
    });

    function checkEmail(email){
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return !reg.test(email);
    }

    $("#register_submit").click(function () {
        $(".verification-password-check").addClass("hidden");
        let email = $("#email").val();
        if(checkEmail(email)){
            $(".verification-email-check").removeClass("hidden");
            return;
        }
        let username = $("#username").val();
        let code = $("#code").val();
        let phone = $("#phone").val();
        let password = $("#password").val();
        let nextPassword = $("#nextPassword").val();
        if(password ==null || nextPassword == null || nextPassword !== password){
            $(".verification-password-check").removeClass("hidden");
            return;
        }
        $.ajax({
            type: 'POST',
            url: REGISTER_URL,
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({email:email,username:username,code:code,phone:phone,password:password}),
            success: function (data) {
                let msg = `<div class="alert alert-success alert-dismissible" role="alert">
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>成功!</strong> ${data.msg}.</div>`;
                $(".m").append(msg);
                window.location.href = "index.html";
            },
            error: function (data) {
                let msg = `<div class="alert alert-warning alert-dismissible" role="alert">
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <strong>错误!</strong> ${data.msg}.</div>`;
                $(".m").append(msg);
            }
        });
    });


});