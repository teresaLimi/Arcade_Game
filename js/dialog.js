// @description 遮罩层
(function(){
    var Mask = function(param){
        this.param = param;
        this.init();
    }
    Mask.prototype.init = function(){
        var div = document.createElement('div');
        div.setAttribute('class','u-Mask');
        div.setAttribute('id',this.param.id);
        document.getElementsByTagName('body')[0].appendChild(div);
    }
    Mask.prototype.close = function(){
        var dom = document.getElementsByClassName('u-Mask')[0];
        document.removeChild(dom);
    }
    window.Mask = Mask;
}());

// @description 弹出框
(function(){
    var Dialog = function(param){
        this.param = param;
        this.init();
    }
    Dialog.prototype.init = function(){
        var maskId = 'dialogMask' + this.param.id;
        var dialog_mask = new Mask({
            id : maskId
        });
        //@description 弹出框结构
        var dialogHtml = "<div class='u-DialogBox' id='"+ this.param.id +
                        "' style='width:" + this.param.width + "px;height:" + this.param.height + "px;'>"+
                        "<div class='u-Dialog'><div class='u-DialogTitle'>" + this.param.title + 
                        "</div><div class='u-DialogContent' style='height:" + (this.param.height-30) + "px;'>"+
                        "<iframe border=none width=100% height=100% src='"+ this.param.url +"'></iframe>"+
                        "</div></div>"+
                        "</div>";

        document.getElementById(maskId).innerHTML = dialogHtml;
    }
    Dialog.prototype.close = function(){
        var dom = document.getElementsByClassName('u-Mask')[0];
        document.removeChild(dom);
    }
    window.Dialog = Dialog;
}());

(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () { for (var i = 0; i < fn.length; i++) fn[i](); };
    var d = document;
    d.ready = function (f) {
      if (!ie && !wk && d.addEventListener)
        return d.addEventListener('DOMContentLoaded', f, false);
      if (fn.push(f) > 1) return;
      if (ie)
        (function () {
          try { d.documentElement.doScroll('left'); run(); }
          catch (err) { setTimeout(arguments.callee, 0); }
        })();
      else if (wk)
        var t = setInterval(function () {
          if (/^(loaded|complete)$/.test(d.readyState))
            clearInterval(t), run();
        }, 0);
    };
})();