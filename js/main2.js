$(document).ready(function () {

      //선택되어서 보이는 배너가 몇번째 인지를 체크할 변수 만들기
    var num = 0;
    //배너가 이동되어야할 위치값을 저장할 변수 만들기
    var bannerMargin = 0;
    //circle 버튼을 저장할 변수 만들기 
    var circleBtn = $(".circleBtn>li");
    //배너를 복사해서 뒤에 붙이 
    var obj = $(".banner>li").clone();
    $(".banner").append(obj);
    var obj1 = $(".banner2>li").clone();
    $(".banner2").append(obj1);
    //circle을 클릭하여 배너 이동하기
    circleBtn.on("click", function (e) {
        e.preventDefault();
        //선택된 버튼이 몇번째 인지 
        sNum = $(this).index();
//        console.log(sNum);
        moveBanner();
       
    })
    //arrowBtn , circleBtn 자동슬라이드 세번이나 써야하기 때문에 함수를 만들어서 한번에 불러서씀
    function moveBanner() {
        //1--> 600
        //2--> -1200
        //5--> -3000
        $(".banner").stop().animate({
            "margin-left": -num *25 + "%"
        }, 3000)
        //선택된 버튼 색상 바꾸기
//        console.log("move:" + num);
        if (num == 6) {
//            sNum = 0;
            //실제 그림이 첫번쨰 그림이 선택된 상태가 되므로 
            //버튼만 첫번째가 활성화 되도록 해준다.

            circleBtn.eq(0).addClass("active").siblings().removeClass("active");
        }
        circleBtn.eq(num).addClass("active").siblings().removeClass("active");
    }
    //right 버튼을 클릭하면 배너 한개가 왼쪽으로 이동하기
    $(".rightBtn").on("click", function (e) {
        e.preventDefault();
//        console.log(num);
        if (num ==6) {           
            num = 0;
             $(".banner").css("margin-left", 0)
        }
        num++;
        moveBanner();
    })
    //left 버튼을 클릭하면 배너가 한개씩 오른쪽으로 이동하기 
    $(".leftBtn").on("click", function (e) {
           e.preventDefault();
        if(num==0){
            num=6;
            $(".banner").css("margin-left",-num*25+"%")
        }
        num--;
        moveBanner();
    })
    //1초마다 배너가 왼쪽으로 한개씩 이동 
    //==> 1초마다 배너는 오른쪽 버튼 누른효과??
    var time = setInterval(function(){
        $(".rightBtn").trigger("click");
    },3000)
    //banner에 마우스를 오버하면 
    $(".banner").mouseover(function(){
        clearInterval(time);
    })
    $(".banner").mouseout(function(){
        time=setInterval(function(){
            $(".rightBtn").trigger("click");
        },3000)
    })
    $(".banner>li").click(function (e) {
        e.preventDefault();
        var sNum = $(this).index();
//        console.log(sNum);
      
        $(".gBig").css("display","block");
        $(".banner2>li").eq(sNum).css("display", "block").siblings().css("display","none");

    })
    $(".close").click(function (e) {
        e.preventDefault();
        $(".gBig").css("display", "none");
    })

})
