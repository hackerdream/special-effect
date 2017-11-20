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
        $oli.eq(index).addClass("on");
        $tab.eq(index).addClass("on");
    }

    $tab.click(function () {

        var num = $(this).index(),
            src = $oli.find("img").eq(index).attr('src');

        $oli.removeClass().eq(num).addClass("on");
        $tab.removeClass().eq(num).addClass("on");
        index = num;

        //设计横、竖排个数
        $mark.empty();
        var wn = 15, //每排每列个数
            vn = 10,
            wl = $oli.eq(num).width() / wn, //单个的宽度高度
            vl = $oli.eq(num).height() / vn,
            arr = []; //存放每个覆盖的li


        for (var v = 0; v < vn; v++) {
            for (var w = 0; w < wn; w++) {
                $li = $("<li></li>"); //給每个li赋予样式

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

                $mark.append($li);

                arr.push($li); //暂时存储每个li节点方便所需修改
            }
        }
        var maxX = wn - 1,
            maxY = vn - 1,
            minX = 0,
            minY = 0,
            flag = 0,
            x = 0,
            y = 0;

        timer = setInterval(function () {
            console.log(x, y);
            $(arr[y * wn + x]).css({
                transform: "scale(.01)"
            }).fadeOut();

            if (y === minY && x < maxX) {
                x++
            } else if (x === maxX && y < maxY) {
                y++;
            } else if (y === maxY && x > minX) {
                x--;
            } else if (x === minX && y > minY) {
                y--;
            }
            if ((y - 1) === minY && x === minX) { //确定拐点
                minX++;
                minY++;
                maxX--;
                maxY--;
            }
            flag++;
            if (flag === wn * vn) {
                clearInterval(timer);
            }
        }, 1000/60)


    })



})