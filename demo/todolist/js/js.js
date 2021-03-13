$(function() {
    //  6.创建元素
    //   创建
    //    $('<div>new element</div>')
    //    $('<div>new element</div>')

    //   添加
    //    $('').append(new_element) 添加到内部末尾
    //    $('').prepend(new_element) 添加到内部开头
    //    $('').before(new_element) 添加到前边
    //    $('').after(new_element) 添加到后边

    //   删除
    //    $('').remove() 删除自己
    //    $('').empty() 清空子元素
    //    $('').html() 置内部 html 文本


    // input press ENTER

    // storage 

    // window.localStorage 生命周期为浏览器
    // localStorage.setItem(key, value)
    // localStorage.getItem(key)
    // localStorage.removeItem(key)
    // localStorage.clear()

    // //添加删除数组元素
    // //1.push方法，入栈，返回数组长度
    // console.log(arr.push('push1', 'push2'));
    // console.log(arr);
    // //2.pop方法，出栈，返回 值（value）
    // console.log(arr.pop());
    // console.log(arr);

    // //3.unshift方法，添加到头，返回数组长度
    // console.log(arr.unshift('unshift1', 'unshift2'));
    // console.log(arr);
    // //4.shift方法，删除头，返回数组长度
    // console.log(arr.shift());
    // console.log(arr);    






    $(function() {
        // 封装函数
        function setData(content, state) {
            data.push({
                content: content,
                state: state
            });
            localStorage.setItem('toDoList_demo', JSON.stringify(data));
        }

        function rmData(content, state) {
            data.splice(data.findIndex(function(obj) {
                return obj.content === content && obj.state === state;
            }), 1);
            localStorage.setItem('toDoList_demo', JSON.stringify(data));
        }

        // function rpData(content, newData) {
        //     data.splice(data.index(content), 1, newData);
        //     localStorage.setItem('toDoList_demo', JSON.stringify(data));
        // }

        function makeDoingTag(content, target, method = true) {

            var new_ele = $($('<button type="button" class="list-group-item doing_list">' + content + '<span class="delete label label-danger">Delete</span>'));
            if (method === true) {
                $(target).prepend(new_ele).children().eq(0).hide().stop().slideDown();
            } else {
                $(target).prepend(new_ele);

            }
            return;

        }

        function makeFinishTag(content, target, method = true) {
            var new_ele = $('<button type="button" class="list-group-item finish_list">' + content + '<span class="delete label label-danger">Delete</span>');
            if (method === true) {
                $(target).prepend(new_ele).children().eq(0).hide().stop().slideDown();
            } else {
                $(target).prepend(new_ele);
            }

            return;
        }
        var load_count = function() {
            var doing_count = $('.doing_count'),
                finish_count = $('.finish_count'),
                list_doing = $('.todo_doing'),
                list_finish = $('.todo_finish');

            return function() {
                // console.log(list_doing.children().length);
                // console.log(list_finish.children().length);
                // console.log(doing_count.html());


                doing_count.html(list_doing.children().length);
                // console.log(doing_count);
                finish_count.html(list_finish.children().length);
            };

        }();

        // initial
        var data = JSON.parse(localStorage.getItem('toDoList_demo'))
        if (data === null) {
            data = [{
                content: '点击右侧 ‘Delete’ 删除事项',
                state: true
            }, {
                content: '点击条目可以使其在两列表间切换',
                state: true
            }, {
                content: '点击 ‘Clear’ 清空事项',
                state: true
            }, {
                content: '点击 ‘Add’ 或按下 Enter 添加事项',
                state: true
            }];
            localStorage.setItem('toDoList_demo', JSON.stringify(data))
        }
        $.each(data, function(index, item) {

            if (item.state === true) {
                makeDoingTag(item.content, '.todo_doing', false);
            } else {
                makeFinishTag(item.content, '.todo_finish', false);
            }

        });

        // 加载 count 
        load_count();

        // 平滑渲染 item
        $('.todo_doing, .todo_finish').slideDown();


        // 开始注册事件
        // btn_clear click
        $('.clear_btn').on('click', function() {
            var list_doing = $('.todo_doing'),
                list_finish = $('.todo_finish');

            return function() {
                localStorage.setItem('toDoList_demo', JSON.stringify([]))
                list_doing.slideUp(function() {
                    $(this).empty().show();
                    load_count();
                });
                list_finish.slideUp(function() {
                    $(this).empty().show();
                    load_count();
                });
                // 加载 count 

            }
        }());
        // presss Enter
        $('.todo_input').on('keyup', function() {
            var btn_add = $('.todo_btn');
            return function(e) {
                if (e.keyCode === 13) {
                    btn_add.trigger('click');
                }
            }
        }());

        // btn_add click
        $('.todo_btn').on('click', function() {
            var btn_input = $('.todo_input');
            return function() {
                if (btn_input.val() === '') {
                    // todo alarm
                    return;
                }
                // setdata
                setData(btn_input.val(), true);

                // add
                makeDoingTag(btn_input.val(), '.todo_doing');
                btn_input.val('');

                // 加载 count 
                load_count();

            }
        }());


        // item delete
        $('.todo_doing, .todo_finish').on('click', '.delete', function(e) {
            // delete data
            rmData($(this).parent().contents()[0].textContent, $(this).hasClass('finish_list') ? false : true);

            // delete
            e.stopPropagation();
            $(this).parent().slideUp(100, function() {
                $(this).remove();
                // 加载 count 
                load_count();
            });


        });

        // item click
        $('.todo_doing').on('click', 'button', function() {
            var block = false // false 代表允许进入
            return function() {
                if (block) {
                    return;
                }
                block = true;
                // set data
                rmData($(this).contents()[0].textContent, true);
                setData($(this).contents()[0].textContent, false);

                // move
                $(this).slideUp(function() {
                    $(this).remove();
                    // 加载 count 
                    load_count();
                    block = false;
                });
                makeFinishTag($(this).contents()[0].textContent, '.todo_finish');
            }


        }());

        $('.todo_finish').on('click', 'button', function() {
            var block = false // false 代表允许进入
            return function() {
                if (block) {
                    return;
                }
                block = true;
                // set data
                rmData($(this).contents()[0].textContent, false);
                setData($(this).contents()[0].textContent, true);

                // move
                $(this).slideUp(function() {
                    $(this).remove();
                    // 加载 count 
                    load_count();
                    block = false;

                });
                makeDoingTag($(this).contents()[0].textContent, '.todo_doing');
            }

        }());






    });
})