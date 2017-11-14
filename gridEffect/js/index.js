(function () {
    var xnum = 5,
        ynum = 5,
        znum = 5,
        num = xnum * ynum * znum, //小块数量
        $box = $("#grid ul"), //容器
        xlen = 400,
        ylen = 400,
        zlen = 800;

    for (var i = 0; i < num; i++) { //随机布局
        var number = parseInt(Math.random()*3);
        var $li = $('<li><p class="title">'+content[number]["title"]+'</p><p class="author">'+content[number]["author"]+'</p><p class="time">'+content[number]["date"]+'</p></li>'),
            x = (Math.random() - 0.5) * 5000, //使得范围在(-2500,2500)
            y = (Math.random() - 0.5) * 5000,
            z = (Math.random() - 0.5) * 5000;

        $li.css({
            'transform': 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)'
        })
        $box.append($li);
    }


    setTimeout(function () {
        Grid();
    }, 1000)

    $("#btn ul li").click(function () {
        var index = $(this).index();

        switch (index) {
            case 0:
                Table();
                break;
            case 1:
                Sphere();
                break;
            case 2:
                Helix();
                break;
            case 3:
                Grid();
                break;
        }
    })

    function Grid() { //网格状态
        var firstX = -parseInt(xnum / 2) * xlen,
            firstY = -parseInt(ynum / 2) * ylen,
            firstZ = -parseInt(znum / 2) * zlen;

        $("#grid ul li").each(function (i) {
            var ix = (i % 25) % 5, //表示距离倍数
                iy = parseInt((i % 25) / 5),
                iz = parseInt(i / 25);

            $(this).css({
                'transform': 'translate3d(' + (firstX + ix * xlen) + 'px,' + (firstY + iy * ylen) + 'px,' + (firstZ + iz * zlen) + 'px)',
            })
        });

        $("#btn").css({
            'transform': 'scale(1)',
            'opacity': 1
        });
    }

    function Helix() { //圆环状
        var mid = num / 2,
            iY = 10; // 围绕y轴旋转，距离用translateZ控制
        $("#grid ul li").each(function (i) {
            $(this).css({
                'transform': 'rotateY(' + i * 10 + 'deg) translateZ(1000px) translateY(' + (iY * (i - mid)) + 'px)',
                'transition': 'all 2s ease-in-out'
            })
        })
    }

    function Sphere() {
        var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];
		var roX = 180/arr.length;
		var fisrtRoX = 90;
		$('#grid ul li').each(function(j){
			var sum = 0;
			var index , num;
			for ( var i=0;i<arr.length;i++ )
			{
				sum += arr[i];
				if ( sum >= j+1 )
				{
					index = i;
					num = arr[i] - (sum-j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = index%2?fisrtRoX+index*roX:fisrtRoX-index*roX;
			var y = num*roY;
			var z = 0;
			if ( x > 90 && x < 270 )
			{
				z = 180;
			}
			$(this).css({
				transform : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});
    }

    function Table() {
        var tX = 160 , tY = 200;
		var firstX = -9*tX + 60;
		var firstY = -4*tY;
		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];
		$('#grid ul li').each(function(i){
			var x , y;
			if ( i < 18 )
			{
				x = arr[i].x;
				y = arr[i].y;
			}else
			{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)'
			});
		});
    }


})();

(function () {

    var movex = 0,
        movey = 0,
        tz = -2000, //记录移动的值
        timer1, timer2, //定时器，起动画缓冲效果
        currentx = 0,
        currenty = 0;

    $(document).mousedown(function (ev) {
        ev = ev || window.event;
        var lastx = ev.clientX,
            lasty = ev.clientY;
        clearInterval(timer1);
        $(document).on('mousemove', (function (ev) {
            ev = ev || window.event;
            currentx = ev.clientX - lastx,
                currenty = ev.clientY - lasty;

            movex += currentx * .2;
            movey -= currenty * .2;

            $("#grid ul").css({
                'transform': 'translateZ(' + tz + 'px) rotateX(' + movey + 'deg) rotateY(' + movex + 'deg)'
            })

            lastx = ev.clientX;
            lasty = ev.clientY;
        }))
        return true;
    }).mouseup(function () {
        $(document).off('mousemove');
        timer1 = setInterval(function () {
            currentx *= .9;
            currenty *= .9;

            if (Math.abs(currentx) < .5 || Math.abs(currenty) < .5) {
                clearInterval(timer1);
            }

            movex += currentx * .2;
            movey -= currenty * .2;

            $("#grid ul").css({
                'transform': 'translateZ(' + tz + 'px) rotateX(' + movey + 'deg) rotateY(' + movex + 'deg)'
            })
        }, 13)
    }).mousewheel(function (ev, d) {
        ev = ev || window.event;

        tz += d * 60;
        tz = Math.min(0, tz);
        tz = Math.max(-8000, tz);

        $("#grid ul").css({
            'transform': 'translateZ(' + tz + 'px) rotateX(' + movey + 'deg) rotateY(' + movex + 'deg)'
        })

        timer2 = setInterval(function () {
            d *= .8;
            tz += d * 60;
            tz = Math.min(0, tz);
            tz = Math.max(-8000, tz);

            if (Math.abs(d) < 0.01) {
                clearInterval(timer2);
            }

            $("#grid ul").css({
                'transform': 'translateZ(' + tz + 'px) rotateX(' + movey + 'deg) rotateY(' + movex + 'deg)'
            })

        }, 13)
    })

})()