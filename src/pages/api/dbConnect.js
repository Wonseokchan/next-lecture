// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";
import executeQuery from "../../../lib/database";

export default async function handler(req, res) {
  /* 
    GET 방식 -> request.query
    POST 방식 -> body(본문)으로 전송
  */
  const { gubun } = req.query;
  const { name, age } = req.body;

  try {
    switch (req.method) {
      //조회
      case "GET":
        const sql = `select * from test where gubun = ?`;
        const rows = await executeQuery(sql, [gubun]);
        res.status(200).json(rows);
        break;

      //추가
      case "POST":
        const insertSql = `INSERT INTO test (name, age, gubun) VALUES(?, ?, 'child')`;
        const data = await executeQuery(insertSql, [name, age]);

        /*
          insert, update, delete => ResultSetHeader 객체정보담겨져있음
          affectedRows : 실제로 insert, update, delete 되었는지 판단
          insertId : 컬럼중에 auto increment(자동채번)되어있는 컬럼의 경우 숫자 +
        */
        if (data.affectedRows > 0) {
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
