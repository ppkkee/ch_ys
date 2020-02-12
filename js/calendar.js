//시스템 날짜 정보 가져오기 
var date = new Date();
//년
var y = date.getFullYear();
//월
var m = date.getMonth(); //-1
//이번달 1일 무슨 요일부터 시작하는지 
var theDay = new Date(y, m, 1);
console.log(theDay);

var week = theDay.getDay();
console.log(week); //0-일

//매달의 마지막 날짜 
var lastDay = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

//이번달의 마지막 날짜
var last = lastDay[m];

//윤달 구하기 
if(y % 40 == 0 || (y % 100 != 0 && y % 4==0)){
	last=29;
}

//줄
var row = Math.ceil((week+last)/7);


//1-31일을 페크해줄 변수 만들기 
var num = 1;

//달력을 저장한 변수 만들기
var cal = "<table>";
cal += "<tr>";
cal += "<th>일</th>";
cal += "<th>월</th>";
cal += "<th>화</th>";
cal += "<th>수</th>";
cal += "<th>목</th>";
cal += "<th>금</th>";
cal += "<th>토</th>";
cal += "</tr>";

for (i = 1; i <= row; i++) {
	cal += "<tr>";
	//칸을 체크할 for
	for (j = 1; j <= 7; j++) {
		if (week >= j && i==1 || last<num) {
			cal += "<td></td>";
		} else {
			cal += "<td>" + (num++) + "</td>";
		}
	}
	cal += "</tr>";
}

cal += "</table>";




document.write(cal);
