/*导航栏根据下拉滑块进行样式修改*/
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav");
    }
})

/*user页面的显示跟隐藏*/
$('.pay').eq(0).show().siblings().hide();
$('.biaoti').click(function (e) {

    let dianjishumu=$(this).index();
    $('.pay').eq(dianjishumu-1).show(700).siblings().hide(500);
    $('.biaoti').eq(dianjishumu-1).addClass('pc_active').siblings().removeClass('pc_active');
})

/*pay_needzhifu 默认隐藏*/
$('.pay #myneedorder').hide();





/*yinsi 设置模态框*/
$('#xinzengdizhi').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

