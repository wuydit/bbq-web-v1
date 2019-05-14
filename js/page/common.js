/**
 * Created by wuyd on 2019/4/6.
 */
const BBQ_USER_COOKIE = 'bbq_user_cookie';
const BBQ_USER_TOKEN_COOKIE = 'bbq_user_token_cookie';
const BBQ_USER = 'bbq_user';
const BBQ_USER_ID = 'bbq_user_id';
const BBQ_USER_USERNAME = 'bbq_user_username';
const BBQ_USER_EMAIL = 'bbq_user_email';
const BBQ_USER_PHONE = 'bbq_user_phone';

const bbq_user = $.cookie(BBQ_USER_COOKIE);
const token = $.cookie(BBQ_USER_TOKEN_COOKIE);
const auth_user = $.cookie(BBQ_USER);

const bbq_user_id = $.cookie(BBQ_USER_ID);
const bbq_user_username = $.cookie(BBQ_USER_USERNAME);
const bbq_user_email = $.cookie(BBQ_USER_EMAIL);
const bbq_user_phone = $.cookie(BBQ_USER_PHONE);

const API = 'api/';
const AUTH = 'auth/';
const SERVER_URL = "http://localhost:8000/";
const SERVER_SOCKET_URL = "ws://localhost:8000";
const URL_NOTE_ADD = SERVER_URL + API + 'note';
const URL_PROVINCES = SERVER_URL + API + 'provinces';
const URL_CITY_LIST = SERVER_URL + API + 'citys';
const URL_SCHOOL_LIST = SERVER_URL + API + 'schools';
const LOGIN_URL = SERVER_URL + AUTH + 'login';

const REGISTER_IS_USERNAME = SERVER_URL + API + 'user/isUsername/';
const REGISTER_IS_MAIL = SERVER_URL + API + 'user/isMail/';
const REGISTER_SEND_MAIL = SERVER_URL + API + 'mail/code/';
/**
 * 注册
 * @type {string}
 */
const REGISTER_URL = SERVER_URL + API + 'register';


/**
 *
 */
const URL_NOTE_PRAISE = SERVER_URL + API + 'notePraise';

/**
 *
 * @type {string}
 */
const URL_IS_SENSITIVE_WORD = SERVER_URL + API + 'isSensitiveWord';

const GET_USER = SERVER_URL + API + 'user';

/**
 *
 * @type {string}
 */
const URL_REPLACE_SENSITIVE_WORD = SERVER_URL + API + 'replaceSensitiveWord';

$.getUrlParam = function(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};

$(function () {
    $(".logout").click(function () {
        $.removeCookie(BBQ_USER_COOKIE);
        $.removeCookie(BBQ_USER_TOKEN_COOKIE);
        $.removeCookie(BBQ_USER_COOKIE);
        $.removeCookie(BBQ_USER_TOKEN_COOKIE);
        $.removeCookie(BBQ_USER);
        $.removeCookie(BBQ_USER_ID);
        $.removeCookie(BBQ_USER_USERNAME);
        $.removeCookie(BBQ_USER_EMAIL);
        $.removeCookie(BBQ_USER_PHONE);
        window.location.href = "index.html";
    });
    let url = window.location.href;
    if(typeof bbq_user == 'undefined' && bbq_user == null && !url.indexOf("index.html")){
        window.location.href = "index.html";
    }
});


