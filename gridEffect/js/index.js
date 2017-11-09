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

    var movex = 0,movey = 0,tz = 0;

    $(document).mousedown(function (ev) {
        ev = ev || window.event;
        var lastx = ev.clientX,
            lasty = ev.clientY;

        $(document).on('mousemove', (function (ev) {
            ev = ev || window.event;
            var currentx = ev.clientX - lastx,
                currenty = ev.clientY - lasty;

            movex += currentx * .2;
            movey -= currenty * .2;

            $("#grid ul").css({
                'transform': 'translateZ('+tz+'px) rotateX('+movey+'deg) rotateY('+movex+'deg)'
            })

            lastx = ev.clientX;
            lasty = ev.clientY;
        }))
    }).mouseup(function(){
        $(document).off('mousemove');
    }).mousewheel(function(ev,d){
        ev = ev || window.event;

        tz += d * 60; 
        tz = Math.min(0,tz);
        tz = Math.max(-8000,tz);
        console.log(tz,movey,movex);

        $("#grid ul").css({
            'transform': 'translateZ('+tz+'px) rotateX('+movey+'deg) rotateY('+movex+'deg)'
        })
    })  

})()