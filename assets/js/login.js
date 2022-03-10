$(function () {
    // 点击"去注册账号"的链接
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    })


    //点击 "去登陆" 的链接
    $("#link_login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    // 从layui中获取from对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;

    // 通过form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd: [/^[0-9]{6,12}$/
            , '密码必须6到12位的数字，且不能出现空格'],

        // 自定义了一个叫做newPwd的校验规则
        newPwd: [/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, "密码必须包含英文和数字，且在6-12位之间"],

        // 校验量词密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
            let pwd = $(".reg-box [name = password]").val();
            if (pwd !== value) {
                return "两次密码不一致"
            };
        }
    })

    // 监听注册表单的提交事件
    $("#from_reg").on("submit", function (e) {
        //阻止默认提交行为
        e.preventDefault();
        // 发起post请求
        $.post("/api/reguser", { username: $("#from_reg [name=username]").val(), password: $("#from_reg [name=password]").val() }, function (res) {
            if (res.status !== 0) {
                layer.msg(res.message)
                return;
            }
            layer.msg("注册成功！请登录");
            $(".login-box [name=username]").val($("#from_reg [name=username]").val());

            // 模拟人的点击行为
            $("#link_login").click();
        })
    })

    // 监听登陆表单的提交事件
    // 这里只是用一个监听表单不同的 方法，原理一样
    $("#form_login").submit(function (e) {
        //阻止默认提交行为
        e.preventDefault();

        $.ajax({
            url:"/api/login",
            method:"POST",
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg("登陆失败！");
                }
                layer.msg("登陆成功！");
                // 将登陆成功得到的 token 字符串，保存到localStorage中
                localStorage.setItem("token",res.token);

                // 跳转到后台主页
                location.href = "/index."
            }
        })
    })
})