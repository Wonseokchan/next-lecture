// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import executeQuery from "../../../lib/database";
export default async function handler(req, res) {
  const { id, pw, name, nickname, gender, idInfo, url } = req.body;

  try {
    switch (url) {
      //아이디 중복 체크
      case "duplicateId":
        const sql = `SELECT * FROM users where user_id = ?`;

        const rows = await executeQuery(sql, [id]);
        if (rows.length > 0) {
          res.status(200).json({ duplicate: true });
        } else {
          res.status(200).json({ duplicate: false });
        }

        break;

      //회원가입
      case "signUP":
        const insertSql = `INSERT INTO users (user_id, user_pw, user_name, create_date, modify_date) VALUES(?, ?, ?, sysdate(), sysdate())`;
        const insertData = await executeQuery(insertSql, [id, pw, name]);

        if (insertData.affectedRows > 0) {
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
        break;

      //닉네임 중복 체크
      case "selectUser":
        const selectSql = `select * from users where user_nickname = ?`;
        const rows2 = await executeQuery(selectSql, [nickname]);
        if (rows2.length > 0) {
          res.status(200).json({ duplicate: true });
        } else {
          res.status(200).json({ duplicate: false });
        }
        break;

      //사용자 정보 추가
      case "userInfoEdit":
        const updateSql = `UPDATE users SET user_gender=?, user_nickname=?, modify_date=sysdate() WHERE user_id=?`;
        const updateData = await executeQuery(updateSql, [
          gender,
          nickname,
          idInfo,
        ]);
        if (updateData.affectedRows > 0) {
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
        break;

      //로그인
      case "login":
        const loginSql = `SELECT * FROM users where user_id = ? AND user_pw = ?`;
        const rows3 = await executeQuery(loginSql, [id, pw]);

        if (rows3.length > 0) {
          res.status(200).json({ success: true });
        } else {
          res.status(200).json({ success: false });
        }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
