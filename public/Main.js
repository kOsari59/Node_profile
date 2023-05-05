//임의로 만들어둔 데이터 있다가 이방식대로 데이터 수정해주면 될 듯
var data = {
  //이건 밑에 이름 정하기
  labels: [
    "0", "0", "0", "0", "0"
  ],

  //이거 하나가 datasets[0] datasets[1] .....
  datasets: [
    {
      label: 'MAX',
      data: [
        0, 0, 0, 0, 0 //초기 데이터
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    },
    {
      label: 'MIN',
      data: [
        0, 0, 0, 0, 0 //초기 데이터
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    },
    {
      label: 'AVG',
      data: [
        0, 0, 0, 0, 0 //초기 데이터
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ],
};
//이건 일단 넣어둔 애니메이션인듯함 차후에 분석필요
var options = {
  animation: {
    animateScale: true
  },
  responsive: false, //크기 조절이라네
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};



// 이게 진짜 차트 설정myChart를 2d로 사용할 꺼라고 지정
var ctx = document.getElementById("myChart").getContext('2d');

var myBarchart = new Chart(ctx, {
  type: 'line', //선그래프
  data: data, //데이터 받아오기
  options: options //옵션 넣기 이거 뭔지 몰라 건들지 말기
});

//버튼 불러오기 Task1 ~ Task5 Core1 ~ Core2
var Task1 = document.getElementById("Task1");
var Task2 = document.getElementById("Task2");
var Task3 = document.getElementById("Task3");
var Task4 = document.getElementById("Task4");
var Task5 = document.getElementById("Task5");
var Core1 = document.getElementById("Core1");
var Core2 = document.getElementById("Core2");
var Core3 = document.getElementById("Core3");
var Core4 = document.getElementById("Core4");
var Core5 = document.getElementById("Core5");


//이부분 부터 수정하면됨 
//버튼에 이벤트 달기 db에서 task 별로 정렬해서 평규 가져오기
Task1.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Task',1); //ajax요청하는거
  data.labels = ['Core1', 'Core2', 'Core3', 'Core4', 'Core5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

Task2.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Task',2); //ajax요청하는거
  data.labels = ['Core1', 'Core2', 'Core3', 'Core4', 'Core5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

Task3.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Task',3); //ajax요청하는거
  data.labels = ['Core1', 'Core2', 'Core3', 'Core4', 'Core5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

Task4.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Task',4); //ajax요청하는거
  data.labels = ['Core1', 'Core2', 'Core3', 'Core4', 'Core5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

Task5.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Task',0); //ajax요청하는거
  data.labels = ['Core1', 'Core2', 'Core3', 'Core4', 'Core5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

//Core별로 평균

Core1.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Core',1); //ajax요청하는거
  data.labels = ['task1', 'task2', 'task3', 'task4', 'task5'] //이걸로 라벨 (밑에꺼 바꾸기)
});


Core2.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Core',2); //ajax요청하는거
  data.labels = ['task1', 'task2', 'task3', 'task4', 'task5'] //이걸로 라벨 (밑에꺼 바꾸기)
});


Core3.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Core',3); //ajax요청하는거
  data.labels = ['task1', 'task2', 'task3', 'task4', 'task5'] //이걸로 라벨 (밑에꺼 바꾸기)
});


Core4.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Core',4); //ajax요청하는거
  data.labels = ['task1', 'task2', 'task3', 'task4', 'task5'] //이걸로 라벨 (밑에꺼 바꾸기)
});


Core5.addEventListener('click', function () {
  db_function('http://localhost:3001/graph/Core',5); //ajax요청하는거
  data.labels = ['task1', 'task2', 'task3', 'task4', 'task5'] //이걸로 라벨 (밑에꺼 바꾸기)
});

//Task1 ~5 까지 작업 해주는거
async function db_function(url,num) {
  const data = {
    number : num
  }
  const oReq = new XMLHttpRequest(); //xml 객체 만들기
  oReq.open('POST', url, true); //POST요청으로 전송
  oReq.setRequestHeader('Content-Type', "application/json") // json 형태로 보낸다
  oReq.send(JSON.stringify(data)); //보내기

  oReq.addEventListener('load', function () { //load 였을때(전송 끝 났을 때)
    result = JSON.parse(oReq.responseText); //파싱하기
    //result 파싱해서 구하기
    dbcon(result);
    
    myBarchart.update(); //업데이트 하면서 표 모양 바꾸기
  })
}



//max min avg 한번에 구하는 함수
function dbcon(result){
    //MAX값 구하기
    score = result.result2;

    var comp_data = data.datasets[0].data; //이게 첫번째 선 값들 바꾸고 싶으면 [i]에 i값 변경하자 첫버째 가 0 두번째 가1
    comp_data[0] = score[0]['db1'];
    comp_data[1] = score[0]['db2'];
    comp_data[2] = score[0]['db3'];
    comp_data[3] = score[0]['db4'];
    comp_data[4] = score[0]['db5'];

    data.datasets[0].data = comp_data; //데이터 진짜 추가 datasets[1]

    //MIN값 구하기
    score = result.result1;

    var comp_data = data.datasets[1].data; //이게 첫번째 선 값들 바꾸고 싶으면 [i]에 i값 변경하자 첫버째 가 0 두번째 가1
    comp_data[0] = score[0]['db1'];
    comp_data[1] = score[0]['db2'];
    comp_data[2] = score[0]['db3'];
    comp_data[3] = score[0]['db4'];
    comp_data[4] = score[0]['db5'];

    data.datasets[1].data = comp_data; //데이터 진짜 추가 datasets[1]

    //avg 값 구하기
    score = result.result;
   
    var comp_data = data.datasets[2].data; //이게 첫번째 선 값들 바꾸고 싶으면 [i]에 i값 변경하자 첫버째 가 0 두번째 가1
    comp_data[0] = score[0]['db1'];
    comp_data[1] = score[0]['db2'];
    comp_data[2] = score[0]['db3'];
    comp_data[3] = score[0]['db4'];
    comp_data[4] = score[0]['db5'];

    data.datasets[2].data = comp_data; //데이터 진짜 추가 datasets[1]
}