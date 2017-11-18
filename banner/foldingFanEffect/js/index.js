$(function () {
    var $box = $("#wrap ul"),
        $oli = $box.find("li"),
        $tab = $("#tab").find("span"),
        $btn = $("#wrap .btn"),
        $mark = $("#mark"),
        index = 0;

    //初始化
    init();

    function init() {
        $oli.eq(0).addClass("on");
        $tab.eq(0).addClass("on");
    }

    $tab.click(function () {
        var num = $(this).index(),
            src = $oli.find("img").eq(index).attr('src');

        $oli.removeClass().eq(num).addClass("on");
        $tab.removeClass().eq(num).addClass("on");
        index = num;

        //设计横、竖排个数
        $mark.empty();
        var wn = 15,
            vn = 10,
            wl = $oli.eq(num).width() / wn,
            vl = $oli.eq(num).height() / vn,
            arr = []; //存放每个覆盖的li

        for (var v = 0; v < vn; v++) {
            for (var w = 0; w < wn; w++) {
                $li = $("<li></li>");


                $li.css({
                    position: 'absolute',
                    left: w * wl + 'px',
                    top: v * vl + 'px',
                    width: wl,
                    height: vl,
                    backgroundImage: 'url(' + src + ')',
                    backgroundPosition: '-' + wl * w + 'px ' + '-' + vl * v + 'px',
                    transition: '1s'
                })
                $li.x = v,
                    $li.y = w;
                $mark.append($li);

                arr.push($li);
            }
        }

        //消失效果
        // time = setInterval(function(){
        //     var index = parseInt(Math.random() * vn * wn);

        //     $(arr[index]).css({
        //         transform:' translate('+(Math.random()*5*wn-2.5*wn) +'px,'+(Math.random()*5*vn-2.5*vn)+'px) rotate(60deg) skew(45deg) scale(0.1)'
        //     }).fadeOut();

        //     if(arr.length === 0){
        //         clearInterval(time);
        //     }
        // },13)
        var count = 0;

        timer = setInterval(function () {
            $(arr).each(function (index, item) {
                console.log(item);
                if (item.x + item.y === count) {
                    item.css({
                        transform: 'translate(-100px,-100px) skew(45deg) rotate(30deg) scale(.4)',
                    }).fadeOut();
                }
            })

            count++;

            if (count > (wn + vn)) {
                clearInterval(timer);
            }
        }, 1000 / 60)

    })



})