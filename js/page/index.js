/**
 * Created by Corbie on 2019/4/6.
 */
// $.cookie('the_cookie', 'the_value', { expires: 7 });
var user = $.cookie('the_cookie');
console.log(user);
//首先判断cookie 若是 cookie 存储用户信息，以及token
// 根据登录信息去更新页面中的div展示 登录 和正在登录的信息等
//去渲染整个页面需要查询的数据 若用户存在查用户所在学校，否则查询数据库最新的几条动态
//分页查询