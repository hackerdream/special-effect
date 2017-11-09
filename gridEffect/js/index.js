(function () {
    var xnum = 5,
        ynum = 5,
        znum = 5,
        num = xnum * ynum * znum, //小块数量
        $box = $("#grid ul"), //容器
        xlen = 400,
        ylen = 400,
        zlen = 800;

    var firstX = -parseInt(xnum / 2) * xlen,
        firstY = -parseInt(ynum / 2) * ylen,
        firstZ = -parseInt(znum / 2) * zlen;

    for (var i = 0; i < num; i++) {
        var $li = $("<li></li>");

        var ix = (i % 25) % 5, //表示距离倍数
            iy = parseInt((i % 25) / 5),
            iz = parseInt(i / 25);

        $li.css({
            'transform': 'translate3d(' + (firstX + ix * xlen) + 'px,' + (firstY + iy * ylen) + 'px,' + (firstZ + iz * zlen) + 'px)'
        })

        $box.append($li);
    }
})();

(function () {

    $(document).mousedown(function (ev) {
        ev = ev || window.event;
        var lastx = ev.clientX,
            movex = 0,movey = 0,
            lasty = ev.clientY;

        $(document).on('mousemove', (function (ev) {
            ev = ev || window.event;
            var currentx = ev.clientX - lastx,
                currenty = ev.clientY - lasty;

            movex += currentx * .2;
            movey -= currenty * .2;

            $("#grid ul").css({
                'transform': 'rotateX('+movey+'deg) rotateY('+movex+'deg)'
            })

            lastx = ev.clientX;
            lasty = ev.clientY;
        }))
    }).mouseup(function(){
        $(document).off('mousemove');
    })

})()