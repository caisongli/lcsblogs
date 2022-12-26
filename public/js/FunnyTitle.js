// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        $('[rel="icon"]').attr('href', "/funny.ico");
        document.title = '╭(°A°`)╮别走~';
        clearTimeout(titleTime);
    }
    else {
        $('[rel="icon"]').attr('href', "/img/tx.png");
        document.title = '(ฅ>ω<*ฅ)回来了~' + OriginTitle;
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});
