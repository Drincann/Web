function scrollSmooth(y, velocity, interval, callback, stopScroll = true) {
    // local 声明
    if (stopScroll) {
        if (typeof stop_scroll === 'undefined') {
            stop_scroll = function (e) { // 事件回调函数
                e.preventDefault();
            };
        }
    } else {
        if (typeof get_state === 'undefined') {
            var fun_list = function () {
                var state = false; // false 用户未滚动
                return [
                    function () { // get state
                        return state;
                    },
                    function (state_) {
                        return function () { // set state
                            state = state_;
                        };
                    }
                ];
            }();
            var get_state = fun_list[0];
            var set_state = fun_list[1];
        }
    }

    function animate(y, velocity, interval, callback) {
        if (stopScroll) {
            document.addEventListener('mousewheel', stop_scroll, {
                passive: false
            });
        } else {
            temp_fun = set_state(true);
            set_state(false)();
            // PC 端
            document.addEventListener('mousewheel', temp_fun);
            document.addEventListener('DOMMouseScroll', temp_fun);
            // 移动端
            document.addEventListener('touchstart', temp_fun);
        }
        this.timer = setInterval(() => {
            if (!stopScroll) {
                if (get_state() === true) { // 判断用户滚动
                    clearInterval(this.timer);
                    document.removeEventListener('mousewheel', temp_fun);
                    callback && callback();
                    return;
                }
            }
            if (Math.abs(window.pageYOffset - y) > 1) { // 滚动过程
                var step = (y - window.pageYOffset) / velocity;
                window.scroll(0, window.pageYOffset + (step < 0 ? Math.floor(step) : Math.ceil(step)));
            } else {
                callback && callback();
                clearInterval(this.timer);
                if (stopScroll) {
                    document.removeEventListener('mousewheel', stop_scroll);
                }
            }
        }, interval);
    }
    return function () {
        clearInterval(this.timer);
        if (stopScroll) { // 清除事件回调
            document.removeEventListener('mousewheel', stop_scroll);
        } else {
            if (typeof temp_fun !== 'undefined') {
                document.removeEventListener('mousewheel', temp_fun);
            }
        }

        animate(y, velocity, interval, callback);
    };
}