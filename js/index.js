$(function () {
    $('.list_container>ul>li.list_child').on('mouseenter touchstart', function () {
        // 小图标
        $(this).siblings().find('.title span').removeClass('current_icon');
        $(this).find('.title span').addClass('current_icon');

        // 下拉框
        $(this).siblings().children('.content').stop().slideUp(500);
        $(this).children('.content').stop().slideDown(500);
    });
    // 初始化音乐控制器
    audioController = new AudioController([
        '/media/群星 - 月光曲 (德布西).mp3',
        '/media/野田洋次郎 - デート.mp3',
        '/media/猫瑾 - ハレハレヤ（朗朗晴天）（翻自 v flower）.mp3'

    ], '#player', '#play', '#loop', '#next', '#prev', '#loading', '#musicInfo', true);
});