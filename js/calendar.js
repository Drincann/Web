$(function () {
    // 基类
    class Base {
        constructor(yearBox, monthBox, contentBox) {
            this.contentBox = $(contentBox);
            this.monthBox = $(monthBox);
            this.yearBox = $(yearBox);
        }
        // 初始化年月
        init() {
            this.yearBox.html((new Date()).getFullYear());
            this.monthBox.html((new Date()).getMonth() + 1);
            return this;
        }
        // 刷新日历
        refreshContent(year, month) {
            if (!year && !month) {
                var { year, month } = this.checkDate({ year: this.yearBox.html(), month: this.monthBox.html() });
            };
            // 当前月的日期数组
            let list = this.range(1, this.getDayCount(year, month));

            // 数组切割
            let start = Math.abs(this.getWeekday(year, month, 1) - 7) + 1;
            let rows = [];
            rows.push(list.slice(0, start));
            // 从第二个星期以 7 为倍数分割
            for (let i of this.range(0, Math.ceil((list.length - start) / 7) - 1)) {
                rows.push(list.slice(start + i * 7, start + (i + 1) * 7));
            }

            // 构造二维列表
            rows = rows.map((row) => {
                return row.map((date) => {
                    return {
                        date,
                        isThisMonth: true
                    };
                });
            });
            // 处理首行
            ({ year, month } = this.checkDate({ year: this.yearBox.html(), month: this.monthBox.html() - 1 }));
            const tail = this.getDayCount(year, month);
            for (let i of this.range(1, 7 - rows[0].length)) {
                rows[0].unshift({
                    date: tail - i + 1,
                    isThisMonth: false
                });
            }
            // 处理尾行
            for (let i of this.range(1, 7 - rows[rows.length - 1].length)) {
                rows[rows.length - 1].push({
                    date: i,
                    isThisMonth: false
                });
            }
            // 导入当前日期到模板引擎
            template.defaults.imports.preDate = undefined;
            let now = new Date();
            if (year == now.getFullYear() && month == now.getMonth()) {

                template.defaults.imports.preDate = now.getDate();
            }

            this.contentBox
                .stop().fadeOut(100, () => this.contentBox.html(template('contentTpl', rows)).fadeIn(500));
            return this;
        }
        // 工具
        // 获取某月的天数
        getDayCount(year, month) {
            return (new Date(year, month, 0)).getDate();
        }
        // 获取某天是星期几
        getWeekday(year, month, date) {
            return (new Date(year, month - 1, date)).getDay() || 7;
        }
        // 构造数组方便f循环
        range(min, max) {
            return [...new Array(max - min + 1).keys()].map((v) => v + min);
        }
        // 检查日期
        checkDate({ year = 1970, month = 1 }) {
            // 范围判断
            month = (month < 1 ? ((year--), 12) : (month > 12 ? ((year++), 1) : month));
            return {
                year: year < 1970 ? (new Date()).getFullYear() : year,
                month
            };
        }
    }

    // 年份控制器
    class YearControl extends Base {
        constructor(yearBox, monthBox, contentBox, year) {
            // 继承
            super(yearBox, monthBox, contentBox);
            // 在 dom 上绑定对象，实现多态
            $(yearBox).siblings().each((index, value) => value.controller = this);
            this.init();
        }
        pre() {
            let { year, month } = this.checkDate({ year: this.yearBox.html() - 1 });
            this.yearBox.html(year);
            this.refreshContent(year, month);
            return this;
        }
        next() {
            let { year, month } = this.checkDate({ year: this.yearBox.html() - 0 + 1 });
            this.yearBox.html(year);
            this.refreshContent(year, month);
            return this;
        }
    }
    // 月份控制器
    class MonthControl extends Base {
        constructor(yearBox, monthBox, contentBox, month) {
            // 继承
            super(yearBox, monthBox, contentBox);
            // 在 dom 上绑定对象，实现多态
            $(monthBox).siblings().each((index, value) => value.controller = this);
            this.init();
        }
        pre() {
            let { year, month } = this.checkDate({ year: this.yearBox.html() - 0, month: this.monthBox.html() - 1 });
            this.yearBox.html(year);
            this.monthBox.html(month);
            this.refreshContent(year, month);
            return this;
        }
        next() {
            let { year, month } = this.checkDate({ year: this.yearBox.html() - 0, month: this.monthBox.html() - 0 + 1 });
            this.yearBox.html(year);
            this.monthBox.html(month);
            this.refreshContent(year, month);
            return this;
        }
    }
    // 实例化控制器
    (new YearControl('#year', '#month', '#content'));
    (new MonthControl('#year', '#month', '#content')).refreshContent();
    // 控制按钮
    $('#yPre, #mPre').on('click', function () { $(this)[0].controller.pre() });
    $('#yNext, #mNext').on('click', function () { $(this)[0].controller.next() });

});