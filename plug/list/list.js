$(function() {
    $('.list_container>ul>li.list_child').mouseenter(function() {
        console.log(1);

        // 小图标
        $(this).siblings().find('.title span').removeClass('current_icon');
        $(this).find('.title span').addClass('current_icon');

        // 下拉框
        $(this).siblings().children('.content').stop().slideUp(400);
        $(this).children('.content').stop().slideDown(400);
    }, )
})