const layer = layui.layer;
$(function(){
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo();

    $("#btnLogout").on("click",function () {
        // 提示用户是否退出
        layer.confirm('确定退出登陆?', {icon: 3, title:'提示'}, function(index){
            //do something
            qingkongback ()

            // 关闭询问框
            layer.close(index);
          });
    })
});
// 获取用户的基本信息
function getUserInfo () {
    $.ajax({
        method:'GET',
        url:"/my/userinfo",
        // headers就是请求头配置对象
        // headers:{
        //     authorization: localStorage.getItem("token") || "",
        // },
        success:function(res) {
            if(res.status !== 0) {
                return layui.layer.msg("获取用户信息失败！")
            }
            console.log(res);
            // 调用 renderAvatar渲染用户头像
            renderAvatar(res.data)
            console.log();
        },
        // 无论成功或失败，最终都会调用complete回调函数
        complete:function(res){
            // 在complete中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            if(res.responseJSON.status === 1) {
                qingkongback ();
            };
        },
    });
};
    // 清空token数据，返回登录页
    function qingkongback () {
        // 1.清空本地存储里的token
        localStorage.removeItem("token");
        // 2.重新跳转到登陆页面
        location.href = "/login.html"
    }


    //  渲染用户头像
function renderAvatar (user) {
    // 1.获取用户的名称
    let name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $(".layui-nav-img").attr("src",user_pic).show();
        $(".text-avatar").hide();
    }else {
        // 3.2 渲染文本头像
        $(".layui-nav-img").hide();
        // 把文本当数组一样用，获取第一个字符
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();

    }
};