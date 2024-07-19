import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function DbConnect() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const getList = async () => {
    const res = await axios.get("/api/dbConnect?gubun=child");
    setList(res.data);
  };
  useEffect(() => {
    getList();
  }, []);

  const nameOnChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const ageOnChange = useCallback((e) => {
    setAge(e.target.value);
  }, []);

  const goSave = async () => {
    const res = await axios.post("/api/dbConnect", { name: name, age: age });
    const data = res.data;
    if (data.success) {
      alert("가입완료입니다.");
    }
  };
  return (
    <div>
      이름{" "}
      <input className="border" type="text" onChange={nameOnChange}></input>
      나이{" "}
      <input className="border" type="number" onChange={ageOnChange}></input>
      <br />
      <button className="border" onClick={goSave}>
        저장
      </button>
      <br />
      <div>
        조회
        <p>전체조회</p>
        {list.map((v, i) => {
          return (
            <p key={i}>
              이름: {v.name}
              <br />
              나이: {v.age}
            </p>
          );
        })}
      </div>
    </div>
  );
}
