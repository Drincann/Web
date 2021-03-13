function AudioController(musicList, player, play, loop, next, prev, load, musicInfo, autoplay) {
    // 封装列表类
    function MusicList(arr) {
        // init
        arr = arr.map(function (value, index) {
            return {
                url: value,
                next: function () {
                    return arr[index + 1 == arr.length ? 0 : index + 1];
                },
                prev: function () {
                    return arr[index - 1 == -1 ? arr.length - 1 : index - 1];
                }
            };
        });
        var current = arr[0];
        this.next = function () {
            current = current.next();
            return current.url;
        };
        this.prev = function () {
            current = current.prev();
            return current.url;
        };
        this.curr = function () {
            return current.url;
        }

    }

    this.setList = function (musicList) {
        srcList = new MusicList(musicList);
        player.prop('src', srcList.curr());
        var currUrl = srcList.curr();
        musicInfo.html(currUrl.substr(currUrl.lastIndexOf('/') + 1));
    };
    // 开始实现
    var player = $(player);
    var play = $(play).addClass('zi zi_play');
    var loop = $(loop).addClass('zi zi_alignjustify');
    var next = $(next).addClass('zi zi_forRight');
    var prev = $(prev).addClass('zi zi_forLeft');
    var load = $(load).addClass('zi zi_genderless');
    var musicInfo = $(musicInfo);
    if (musicList.length <= 0) {
        throw new Error('musicList 应为一个非空数组')
    }
    var srcList = new MusicList(musicList);
    // 初始化歌曲信息
    player.prop('src', srcList.curr());
    var currUrl = srcList.curr();
    musicInfo.html(currUrl.substr(currUrl.lastIndexOf('/') + 1));
    // 初始化播放 autoplay
    if (autoplay) {
        $(window).one('click', function (e) {
            if (e.target != play[0]) {
                play.trigger('click');
            }
        });
    }

    // loadstart canplay 事件，去除加载动画
    player.on('loadstart', () => load.fadeIn());
    player.on('canplay', () => load.fadeOut());

    // 播放 / 暂停
    play.on('click', function () {
        if (player.prop('paused')) {
            // 开始播放
            player[0].play().catch(function () {
                // 捕获到终止 play 的 promise 时跑出的异常
                // do nothing
            });
            $(this).removeClass('zi_play').addClass('zi_pause');
        } else {
            // 暂停播放
            player[0].pause();
            $(this).removeClass('zi_pause').addClass('zi_play');
        }
    });

    // 下一首
    next.on('click', function () {
        player.prop('src', srcList.next());
        var currUrl = srcList.curr();
        musicInfo.html(currUrl.substr(currUrl.lastIndexOf('/') + 1));
        play.trigger('click');
    });
    // 上一首
    prev.on('click', function () {
        player.prop('src', srcList.prev());
        var currUrl = srcList.curr();
        musicInfo.html(currUrl.substr(currUrl.lastIndexOf('/') + 1));
        play.trigger('click');
    });

    // 播放控制
    // 循环 / 顺序
    loop.on('click', function () {
        if (player.prop('loop')) {
            // 切换到顺序播放
            player.prop('loop', false);
            $(this).removeClass('zi_redoalt').addClass('zi_alignjustify');
        } else {
            // 切换到循环播放
            player.prop('loop', true);
            $(this).removeClass('zi_alignjustify').addClass('zi_redoalt');
        }
    });
    // 自动切换
    player.on('ended', function () {
        if (player.prop('loop')) return;
        next.trigger('click');
    });
}