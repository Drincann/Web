$(function() {
    var arr = [
        ['Life is short.I like programming.', 'Hello World !'],

        ['“我们不停地添加代码，像画家添加色彩，作曲家添加音符，每一个小细节都必须有依据……努力使每件事情完美地组合在一起，以一种前人未曾做过的方式。这使得工程师称为真正的艺术家。”', '—— Stephen · Gary · Wozniak'],

        ['一百位程序员只有一种样子', '"这个技术上实现不了。"'],
        ['程序员从来不缺对象', 'obj = new Obj(What_I_like)'],
        ['竟然可以运行，为什么呢？', '竟然不可以运行，为什么呢？'],
        ['There are 10 kinds of people in the world, those that understand trinary, those that don’t, and those that confuse it with binary.', '这个世界上有 10 种人，一种是能理解二进制的，一种则不懂。']

    ];
    for (text of arr) {
        $('#dowebok').append($('<section></section>').attr({
            class: 'section'
        }).css({
            background: 'url(images/landscape' + (arr.indexOf(text) + 1) + '.jpg' + ') no-repeat top center',
            backgroundSize: 'cover'
        }).html('<h1>' + text[0] + '</h1>' + '<h2>' + text[1] + '</h2>'));
    }
    $('#dowebok').fullpage({
        scrollingSpeed: 1500,
        verticalCentered: true,
        navigation: true,
        css3: true,
        continuousVertical: true,
        navigationTooltips: [
            'Hollo World',
            'Stephen · Gary · Wozniak',
            'Oh ~',
            'Obj',
            '? ?',
            'trinary'
        ]


    });
});