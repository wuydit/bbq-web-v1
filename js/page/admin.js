let page = 0;
let size = 10;
let sort = {sort: 'createTime'};
let pageable = {page: page, size: size, sort: sort};
$(function () {
    let documentBody = $("body");
    getUsers(pageable);


    documentBody.delegate(".user-disable","click",function(){
        let id = $(this).attr("data-user-id");
        $.ajax({
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            url: SERVER_URL + 'api/user/'+id+'/enabled/false',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                window.location.href = "admin.html";
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

    documentBody.delegate(".user-enable","click",function(){
        let id = $(this).attr("data-user-id");
        $.ajax({
            type: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            url: SERVER_URL + 'api/user/'+id+'/enabled/true',
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            success: function (data) {
                window.location.href = "admin.html";
            },
            error: function (data) {
                $.growl.error({title: "发生错误", message: '服务器错误。'});
            }
        });
    });

    documentBody.delegate(".page-btn-user","click",function(){
        page = $(this).text()-1;
        getUsers({page: $(this).text()-1, size: size, sort: sort});
    });

    documentBody.delegate(".page-next-user","click",function(){
        page = page+1;
        getUsers({page: page , size: size, sort: sort});
    });
    documentBody.delegate(".page-pre-user","click",function(){
        page = Math.max(0,page-1);
        getUsers({page: page, size: size, sort: sort});
    });

});

const getUsers = function (pageable) {
    $.ajax({
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        url: SERVER_URL + 'api/admin/users',
        dataType: "json",
        data: pageable,
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if (!!data && data.content && data.content.length > 0) {
                $(".users-page-list").empty();
                data.content.forEach(v => {
                    if(v.id ===1 || v.id === '1'){
                        console.log("管理员不可修改");
                    }else {
                        let dateTime = formatTime(v.createTime, 'Y/M/D h:m:s');
                        let status = `<td class="col-md-1">启用</td><td class="col-md-1"><a class="btn btn-danger user-disable"  data-user-id="${v.id}" >禁用</a></td>`;
                        if (!v.enabled) {
                            status = `<td class="col-md-1">禁用</td><td class="col-md-1"><a class="btn btn-info user-enable" data-user-id="${v.id}">启用</a></td>`;
                        }
                        let user = `<tr><td class="col-md-1">${v.username}</td><td class="col-md-1">${v.phone}</td><td class="col-md-1">${v.email}</td><td class="col-md-2">${dateTime}</td>${status}</tr>`;
                        $(".users-page-list").append(user);
                    }
                });
            }
            $(".userListPageFenYe").empty();
            let userListPageFenYe = ` <li>
                <a href="#" class="page-pre-user" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>`;
            if (data.totalPages > 1) {
                for (let i = 1; i < data.totalPages; i++) {
                    userListPageFenYe += `<li><a href="#" class="page-btn-user page-btn-user-${i}">${i}</a></li>`;
                }
            } else {
                userListPageFenYe += `<li><a href="#" class="page-btn-user active">1</a></li>`;
            }
            userListPageFenYe += ` <li>
                <a href="#" class="page-next-user" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>`;
            $(".userListPageFenYe").append(userListPageFenYe);

            $(".page-btn-user-" + data.number).addClass("active")

        },
        error: function (data) {
            $.growl.error({title: "发生错误", message: '服务器错误。'});
        }
    });
};

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number, format) {
    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    let returnArr = [];
    let date = new Date(number);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (let i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

//数据转化
function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}