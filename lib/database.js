//mysql2라이브러리 사용 >> createPool 함수
import { createPool } from "mysql2";
import { resolve } from "styled-jsx/css";

//DB 연결 풀 생성
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "next1234!",
  database: "reactdb",
  port: "3305",
});

//연결 pool에서 연결 가져오기(성공, 에러 처리)
pool.getConnection((err, conn) => {
  if (err) {
    console.log("db connection error");
  } else {
    console.log("db connection success");
  }
  conn.release(); //연결반환
});

//쿼리 실행함수
const executeQuery = (query, arr) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arr, (err, data) => {
        if (err) {
          console.log("query execute error");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};
export default executeQuery;
