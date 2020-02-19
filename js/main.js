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
        if (num == 4) {
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
        if (num ==4) {           
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
            num=4;
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




    
//    달력//////////////////////////////
    
    
    var today = new Date(); //오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
    var date = new Date(); //today의 Date를 세어주는 역할


    var today = new Date(); //오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
    var date = new Date(); //today의 Date를 세어주는 역할



    function buildCalendar() { //현재 달 달력 만들기
        today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        //이번 달의 첫째 날,
        //new를 쓰는 이유 : new를 쓰면 이번달의 로컬 월을 정확하게 받아온다.     
        //new를 쓰지 않았을때 이번달을 받아오려면 +1을 해줘야한다. 
        //왜냐면 getMonth()는 0~11을 반환하기 때문
        var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        //이번 달의 마지막 날
        //new를 써주면 정확한 월을 가져옴, getMonth()+1을 해주면 다음달로 넘어가는데
        //day를 1부터 시작하는게 아니라 0부터 시작하기 때문에 
        //대로 된 다음달 시작일(1일)은 못가져오고 1 전인 0, 즉 전달 마지막일 을 가져오게 된다
        var tbCalendar = document.getElementById("calendar");
        //날짜를 찍을 테이블 변수 만듬, 일 까지 다 찍힘
        var tbCalendarYM = document.getElementById("tbCalendarYM");
        //테이블에 정확한 날짜 찍는 변수
        //innerHTML : js 언어를 HTML의 권장 표준 언어로 바꾼다
        //new를 찍지 않아서 month는 +1을 더해줘야 한다. 
        tbCalendarYM.innerHTML = "0" + (today.getMonth() + 1);

        /*while은 이번달이 끝나면 다음달로 넘겨주는 역할*/
        while (tbCalendar.rows.length > 2) {
            //열을 지워줌
            //기본 열 크기는 body 부분에서 2로 고정되어 있다.
            tbCalendar.deleteRow(tbCalendar.rows.length - 1);
            //테이블의 tr 갯수 만큼의 열 묶음은 -1칸 해줘야지 
            //30일 이후로 담을달에 순서대로 열이 계속 이어진다.
        }
        var row = null;
        row = tbCalendar.insertRow();
        //테이블에 새로운 열 삽입//즉, 초기화
        var cnt = 0; // count, 셀의 갯수를 세어주는 역할
        // 1일이 시작되는 칸을 맞추어 줌
        for (i = 0; i < doMonth.getDay(); i++) {
            /*이번달의 day만큼 돌림*/
            cell = row.insertCell(); //열 한칸한칸 계속 만들어주는 역할
            cnt = cnt + 1; //열의 갯수를 계속 다음으로 위치하게 해주는 역할
        }
        /*달력 출력*/
        for (i = 1; i <= lastDate.getDate(); i++) {
            //1일부터 마지막 일까지 돌림
            cell = row.insertCell(); //열 한칸한칸 계속 만들어주는 역할
            cell.innerHTML = i; //셀을 1부터 마지막 day까지 HTML 문법에 넣어줌
            cnt = cnt + 1; //열의 갯수를 계속 다음으로 위치하게 해주는 역할
            if (cnt % 7 == 1) {
                /*일요일 계산*/
                //1주일이 7일 이므로 일요일 구하기
                //월화수목금토일을 7로 나눴을때 나머지가 1이면 cnt가 1번째에 위치함을 의미한다
                //                cell.innerHTML = "<font color=#F79DC2>" + i
                //1번째의 cell에만 색칠
            }
            if (cnt % 7 == 0) {
                /* 1주일이 7일 이므로 토요일 구하기*/
                //월화수목금토일을 7로 나눴을때 나머지가 0이면 cnt가 7번째에 위치함을 의미한다
                //                  cell.innerHTML = "<font color=skyblue>" + i
                //7번째의 cell에만 색칠
                row = calendar.insertRow();
                //토요일 다음에 올 셀을 추가
            }
            /*오늘의 날짜에 노란색 칠하기*/
            if (today.getFullYear() == date.getFullYear() &&
                today.getMonth() == '2' &&
                i == '21') {
                //달력에 있는 년,달과 내 컴퓨터의 로컬 년,달이 같고, 일이 오늘의 일과 같으면
                cell.bgColor = "#899f64"; //셀의 배경색을 노랑으로 
                cell.style.borderRadius = "100px";
                cell.style.color = "#ffffff";
            }
        }
    }

    buildCalendar();
})
