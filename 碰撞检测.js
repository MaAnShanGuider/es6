var first1 = document.querySelector(".first");
var second1 = document.querySelector(".second");

function judgeCrash(obj) {
    this.first = obj.elem1;
    this.second = obj.elem2;
    this.fnS = obj.fnS;
    this.fnE = obj.fnE;
    this.judge = function() {
        var Stop = this.second.offsetTop;
        var Sleft = this.second.offsetLeft;
        var Ftop = this.first.offsetTop;
        var Fleft = this.first.offsetLeft;
        var minLeft = Fleft - this.second.offsetWidth;
        var maxLeft = Fleft + this.first.offsetWidth;
        var minTop = Ftop - this.second.offsetHeight;
        var maxTop = Ftop + this.first.offsetHeight;
        if (Sleft >= minLeft && Sleft <= maxLeft && Stop >= minTop && Stop <= maxTop) {
            if (this.fnS) { //判断fun有没有
                this.fnS();
                return;
            }
        }
        if (this.fnE) { //判断error有没有
            this.fnE();
        }
    }
    var fn = this.judge;
    this.first.onmousedown = function(event) {
        var t = this; //t=this.first
        console.log(t)
        var startX = event.clientX;
        var startY = event.clientY;
        var offX = t.offsetLeft;
        var offY = t.offsetTop;
        document.onmousemove = function(event) {
            var theleft = event.clientX - startX;
            var theTop = event.clientY - startY;
            fn();
            t.style.left = offX + theleft + 'px';
            t.style.top = offY + theTop + 'px';
        }
        document.onmouseup = function(event) {
            document.onmousemove = null;
        }
    }
}



judgeCrash({
    elem1: first1,
    elem2: second1,
    fnS: function() {
        console.log("Yes");

        document.getElementById('one').innerHTML = 'Yes';
    },
    fnE: function() {

    }
});

judgeCrash({
    elem1: second1,
    elem2: first1,
    fnS: function() {
        console.log("Yes");
        document.getElementById('one').innerHTML = 'Yes';
    },
    fnE: function() {

    }
});