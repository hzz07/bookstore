$(function () {
    getCount();

})
function getCount() {
    $.get('/shop_car/show', function (data) {
        $("#shopping_car_total_num").html(data.total_num);
    })
}
$('.pay').eq(0).show().siblings().hide();

/*导航栏根据下拉滑块进行样式修改*/
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav");
    }
})


/*pay_needzhifu 默认隐藏*/
$('.pay #myneedorder').hide();





/*yinsi 设置模态框*/
$('#xinzengdizhi').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

