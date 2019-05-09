/**
 * Created by wuyd on 2019/4/6.
 */
const USER_COOKIE = 'user_cookie_wu_01';
const USER_TOKEN = 'user_token_wu_01';
$.cookie(USER_TOKEN, 'wuydToken', {expires: 7});
// const user = $.cookie(USER_COOKIE);
const token = $.cookie(USER_TOKEN);

const API = 'api/';
const SERVER_URL = "http://localhost:8000/";
const URL_NOTE_ADD = SERVER_URL + API + 'note' + '?token=' + token;
const URL_PROVINCES = SERVER_URL + API + 'provinces' + '?token=' + token;
const URL_CITY_LIST = SERVER_URL + API + 'citys' + '?token=' + token;
const URL_SCHOOL_LIST = SERVER_URL + API + 'schools' + '?token=' + token;

/**
 *
 */
const URL_NOTE_PRAISE = SERVER_URL + API + 'notePraise' + '?token=' + token;

/**
 *
 * @type {string}
 */
const URL_IS_SENSITIVE_WORD = SERVER_URL + API + 'isSensitiveWord' + '?token=' + token;
/**
 *
 * @type {string}
 */
const URL_REPLACE_SENSITIVE_WORD = SERVER_URL + API + 'replaceSensitiveWord' + '?token=' + token;

$.getUrlParam = function(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};

