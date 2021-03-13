// 回到顶部
$('#backToTop').on('click', scrollSmooth(0, 7, 10, undefined, false));
var questionDate = {
    list: [
        {
            question: 'Q1：1、你的年龄？',
            type: 'radio',
            options: [
                'A.18岁以下',
                'B.18至28岁',
                'C.28至40岁',
                'D.40岁以上'
            ]

        }, {
            question: 'Q2：2、你有了解过或者使用过小米手机？',
            type: 'radio',
            options: [
                'A.有',
                'B.有一点',
                'C.完全没有',
            ]

        }, {
            question: 'Q3：3、你一般到什么地方购买手机？',
            type: 'radio',
            options: [
                'A.专卖店',
                'B.移动、联通、电信公司',
                'C.超市或者百货店',
                'D.网购'
            ]

        }, {
            question: 'Q4：4、你购买手机时首要考虑的因素是什么？',
            type: 'radio',
            options: [
                'A.品牌',
                'B.价格',
                'C.外形',
                'D.操作系统'
            ]

        }, {
            question: 'Q5：5、你觉得小米手机怎么样？',
            type: 'radio',
            options: [
                'A.非常满意',
                'B.一般',
                'C.差'
            ]

        }, {
            question: 'Q6：6、你认为小米手机的配置如何？',
            type: 'radio',
            options: [
                'A.好',
                'B.一般',
                'C.不好'
            ]

        }, {
            question: 'Q7：7、你认为小米手机1999的价格有没有竞争优势？',
            type: 'radio',
            options: [
                'A.有',
                'B.没有',
                'C.不好说'
            ]

        }, {
            question: 'Q8：8、作为小米的竞争对手华为，你觉得哪个更好？',
            type: 'radio',
            options: [
                'A.华为好',
                'B.小米好',
                'C.差不多'
            ]

        }, {
            question: 'Q9：9、你对小米手机的产品设计风格有什么偏好？',
            type: 'radio',
            options: [
                'A.时尚前卫',
                'B.高贵典雅',
                'C.简约大方',
                'D.个性张扬'
            ]

        }, {
            question: 'Q10：10、你觉得小米手机和其他国产手机相比，其最大优势什么？（多选题）',
            type: 'checkbox',
            options: [
                'A.价格便宜',
                'B.硬件配置高',
                'C.性价比高',
                'D.MIUI系统好用',
                'E.企业形象',
                'F.跟随潮流，受他人影响'
            ]

        }, {
            question: 'Q11：如果购买小米手机，你最担心的是什么？（多选题）',
            type: 'checkbox',
            options: [
                'A.售后服务能否得到保障',
                'B.系统的稳定性',
                'C.电池的发热问题',
                'D.产品的做工质量',
                'E.其他'
            ]

        }, {
            question: 'Q12：12、相对于你现在或者原来使用的手机，你觉得小米手机还有哪些不足？（多选题）',
            type: 'checkbox',
            options: [
                'A.品牌影响力不够',
                'B.质量没有保证',
                'C.购买不方便',
                'D.售后还不完善',
                'E.时机不够精致'
            ]

        }, {
            question: 'Q13：13、你对小米手机在未来的发展中有什么看法或建议？',
            type: 'textarea'

        }
    ]
};
var provinceData = [{
    id: '001',
    name: '黑龙江省'
}, {
    id: '002',
    name: '四川省'
}, {
    id: '003',
    name: '河北省'
}, {
    id: '004',
    name: '江苏省'
}];
var cityData = {
    '001': [{
        id: '300',
        name: '哈尔滨市'
    }, {
        id: '301',
        name: '齐齐哈尔市'
    }, {
        id: '302',
        name: '牡丹江市'
    }, {
        id: '303',
        name: '佳木斯市'
    }],
    '002': [{
        id: '400',
        name: '成都市'
    }, {
        id: '401',
        name: '绵阳市'
    }, {
        id: '402',
        name: '德阳市'
    }, {
        id: '403',
        name: '攀枝花市'
    }],
    '003': [{
        id: '500',
        name: '石家庄市'
    }, {
        id: '501',
        name: '唐山市'
    }, {
        id: '502',
        name: '秦皇岛市'
    }, {
        id: '503',
        name: '邯郸市'
    }],
    '004': [{
        id: '600',
        name: '常州市'
    }, {
        id: '601',
        name: '徐州市'
    }, {
        id: '602',
        name: '南京市'
    }, {
        id: '603',
        name: '淮安市'
    }]
};

// 省市联动
var province = $('#province');
var city = $('#city');
// 渲染省份
province.html(template('provinceTpl', provinceData));
province.on('change', function () {
    city.html(template('cityTpl', cityData[province.val()]));
});


// 列表
// 渲染模板
$('#questionBox').html(template('questionTpl', questionDate));
// 表单提交
$('#submit').on('click', function (e) {
    var form = $('#questionBox');
    // 验证单选
    for (item of form.find('input:radio').parents('.item')) {
        if ($(item).find('input:radio:checked').length == 0) {
            return info('alert-danger', '请检查未填写的单选题');
        }

    }
    // 验证复选
    for (item of form.find('input:checkbox').parents('.item')) {
        if ($(item).find('input:checkbox:checked').length == 0) {
            return info('alert-danger', '请检查未填写的多选题');
        }

    }
    // ajax request
    var formdata = new FormData(form[0]);
    $.ajax({
        type: 'post',
        url: '/exampleUrl',
        data: formdata,

        // 防止 jq 解析
        processData: false,
        contentType: false
    }).done(function () {
        // do sth.
    }).fail(function (err) {
        // 显示错误信息
        try {
            // 由于要模拟成功，错误处理需要注释
            // info('alert-danger', JSON.parse(err.responseText).message)
        } catch (error) {
            // info('alert-danger', err.responseText)
        }
    });
    // 模拟成功
    scrollSmooth(0, 7, 10, function () {
        info('alert-success', '提交成功，感谢您的支持');
    }, false)();
});

// 封装提示信息渲染
function info(classText, infoText) {
    $('#infoBox').html(template('infoTpl', { classText, infoText }));
    $('#info').fadeIn();
    setTimeout(function () {
        $('#info').fadeOut();
    }, 4000)
}