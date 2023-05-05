const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const { sequelize, User } = require('./models');
const multer = require('multer');
const user = require('./models/user');
const fs = require('fs');


//윗 부분은 불러 오는거임 중요 X


//여러 변수등 설정하자
let task = [5];
let date;
let core = [];
let text = null;
let textSplitArr = null;

//express 설정임
const app = express();
app.set('port', process.env.PORT || 3001); //3001번 포트 쓸꺼임
app.use(express.static(path.join(__dirname, 'public'))); //public에 Main.js들어 있는데 이거 안보내면 Main.js못 읽어서 graph랑 연결 못함


sequelize.sync({ force: false }) //시퀄라이즈 (DB) 연결
  .then(() => {//연결 성공시
    console.log('데이터베이스 연결 성공');

    user.destroy({
      truncate: true//db 테이블 초기화 user db 지우자
    });

  })
  .catch((err) => {//연결 실패시
    console.error(err);
  });
//업로드한 파일 저장할 위치
//views파일 읽어오기
//못 읽어오면 mkdirSync로 views만들기
try {
  fs.readdirSync('views');
} catch (error) {
  console.error('views 폴더가 없어 views 폴더를 생성합니다.');
  fs.mkdirSync('views');
}

//파일 업로드 할거임
const upload = multer({
  storage: multer.diskStorage({     //디스크에 넣을게
    destination(req, file, done) { //저장 위치 views
      done(null, 'views/');
    },
    filename(req, file, done) { //파일 이름
      date = Date.now(); //현재 시간 받기
      const ext = path.extname(file.originalname);    //확장자 받기
      done(null, 'file' + date + ext);   //파일 이름이 겹치지 않기 위해, 베이스네임에서 확장자 떼고 현재 시각을 넣고 확장자 붙힘
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },    //Mb
});

app.get('/', (req, res) => {// /를 주소 GET 요청으로 받으면 업로드(메인화면) 파일을 보낸다
  res.sendFile(path.join(__dirname, 'html/upload.html'));
});

app.post('/', upload.single('txt'), async (req, res) => { // /에서 txt 받아오기

  let a = 0;
  text = fs.readFileSync(`./views/file${date}.txt`); //파일 읽어오기
  textSplitArr = text.toString().split('\t'); //읽은거 탭으로 구분


  let id_id = 1;
  let j = 0;
  let x = 0;
  let y = 0;

  //파싱과정

  for (i = 6; i <= textSplitArr.length; i++) {

    if (!(isNaN(textSplitArr[i]) || textSplitArr[i].includes('\n'))) { //null이아니거나 탭을 포함하고 있으면
      task[j] = textSplitArr[i];  //현재꺼 task[]에다 담기
      //console.log(i + " j=/" + j + "/" + task[j]);
      j++;//다음j를 위해 j올려주기

      if (j == 5) { //만약 5라면 즉 5개의 입력을 받았다면
        core.push([task[0], task[1], task[2], task[3], task[4]]);//각각 집어넣기
        j = 0;//j를 다시 처음부터 집어 넣을 수 있도록 초기화
      }
    }
  }
  //console.log(core);
  //core 배열을 뒤집어서 DB에 넣기
  for (x = 0; x < core.length; x = x + 5) {//한줄에 5개의 값이 있음으로 5개씩 넘어가자
    for (y = 0; y < 5; y++) {
      await user.create( //DB에 집어넣기 (insert) 뒤집어서 넣어야 하기에 x를 증가 시킨다.
        {
          id: id_id,
          core1: core[x][y],
          core2: core[x + 1][y],
          core3: core[x + 2][y],
          core4: core[x + 3][y],
          core5: core[x + 4][y]
        });

      id_id++; //id하나씩 올려주자
    }
  }
  /* 평균 구해지는지 테스트 코드
  await user.findAll({
    attributes: [[sequelize.fn('AVG', sequelize.col('core1')), 'avg']]
  });
  console.log(req.file);*/
  await res.sendFile(path.join(__dirname, 'html/graph.html'));//입력 끝나면 그래프 보여주는 페이지로 옮기기
});

app.post("/graph/Task", async function (req, res) { //그래프로 요청이 왔으면
  var body = "";
  await req.on('data', (data) => {
    body += data;
  });
  var { number } = JSON.parse(body);
  console.log(number);
  response = await db_Task_select(res,number);
  //성공 하면 200번 response JSON형식으로 바꿔서 전달
  res.status(200);
  res.send(JSON.stringify(response));
});

async function db_Task_select(res, num) {
  //전달할 데이터
  var responsive = {};
  //그래프에 필요한 값 질의하기

  let query = `SELECT AVG(core1) AS 'db1', AVG(core2) AS 'db2', AVG(core3) AS 'db3', AVG(core4) AS 'db4', AVG(core5) AS 'db5' From cpuschema.cpu WHERE MOD(id,5) =${num}`;
  const [result, metadata] = await sequelize.query(query);

  query = `SELECT MIN(core1) AS 'db1', MIN(core2) AS 'db2', MIN(core3) AS 'db3', MIN(core4) AS 'db4', MIN(core5) AS 'db5' From cpuschema.cpu WHERE MOD(id,5) =${num}`;
  const [result1, metadata1] = await sequelize.query(query);

  query = `SELECT MAX(core1) AS 'db1', MAX(core2) AS 'db2', MAX(core3) AS 'db3', MAX(core4) AS 'db4', MAX(core5) AS 'db5' From cpuschema.cpu WHERE MOD(id,5) =${num}`;
  const [result2, metadata2] = await sequelize.query(query);
  //나온 q배열을 response안에 넣어서 전달 할 예정
  const response = {
    result,
    result1,
    result2
  }

  return response;
}

app.post("/graph/Core", async function (req, res) { //그래프로 요청이 왔으면
  var body = "";
  await req.on('data', (data) => {
    body += data;
  });
  var { number } = JSON.parse(body);
  console.log(number);
  response = await db_Core_select(res,number);
  //성공 하면 200번 response JSON형식으로 바꿔서 전달
  res.status(200);
  res.send(JSON.stringify(response));
});

async function db_Core_select(res, num) {
  //전달할 데이터
  var responsive = {};
  //그래프에 필요한 값 질의하기

  let query = `SELECT (SELECT AVG(core${num}) FROM cpuschema.cpu where mod(id,5) = 1) AS 'db1', 
  (SELECT AVG(core${num}) FROM cpuschema.cpu where mod(id,5) = 2) AS 'db2',
  (SELECT AVG(core${num}) FROM cpuschema.cpu where mod(id,5) = 3) AS 'db3',
  (SELECT AVG(core${num}) FROM cpuschema.cpu where mod(id,5) = 4) AS 'db4',
  (SELECT AVG(core${num}) FROM cpuschema.cpu where mod(id,5) = 0) AS 'db5'
  `;
  const [result, metadata] = await sequelize.query(query);

  query = `SELECT (SELECT MIN(core${num}) FROM cpuschema.cpu where mod(id,5) = 1) AS 'db1', 
  (SELECT MIN(core${num}) FROM cpuschema.cpu where mod(id,5) = 2) AS 'db2',
  (SELECT MIN(core${num}) FROM cpuschema.cpu where mod(id,5) = 3) AS 'db3',
  (SELECT MIN(core${num}) FROM cpuschema.cpu where mod(id,5) = 4) AS 'db4',
  (SELECT MIN(core${num}) FROM cpuschema.cpu where mod(id,5) = 0) AS 'db5'
  `;
  const [result1, metadata1] = await sequelize.query(query);

  query =`SELECT (SELECT MAX(core${num}) FROM cpuschema.cpu where mod(id,5) = 1) AS 'db1', 
  (SELECT MAX(core${num}) FROM cpuschema.cpu where mod(id,5) = 2) AS 'db2',
  (SELECT MAX(core${num}) FROM cpuschema.cpu where mod(id,5) = 3) AS 'db3',
  (SELECT MAX(core${num}) FROM cpuschema.cpu where mod(id,5) = 4) AS 'db4',
  (SELECT MAX(core${num}) FROM cpuschema.cpu where mod(id,5) = 0) AS 'db5'
  `;
  const [result2, metadata2] = await sequelize.query(query);
  //나온 q배열을 response안에 넣어서 전달 할 예정
  const response = {
    result,
    result1,
    result2
  }

  return response;
}




//에러나면 에러처리 템블릿 렌더링해주기
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

//graph주소로 오면 그래프 출력해줌
app.get('/graph', (req, res) => {
  res.sendFile(path.join(__dirname, 'html/graph.html'));
});

//포트설정
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
