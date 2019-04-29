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
const URL_CITYS_LIST = SERVER_URL + API + 'citys' + '?token=' + token;
const URL_SCHOOL_LIST = SERVER_URL + API + 'schools' + '?token=' + token;




