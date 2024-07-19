import axios from "axios";

export default function ApiSend() {
  const goApiSend = async () => {
    //1. client-side fetching
    const key =
      "s9LtJ4f28XKtHHjtRa94y0gWEWaArpqpuNkbkpRyVgYYyLDPigB20QyFaSduFmFXXydgwTJSD4Ef53t5Z1%2BnFg%3D%3D";

    const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?serviceKey=${key}&numOfRows=10&pageNo=1&stnId=133&tmFc=202407160600&dataType=JSON`;

    // const res = await axios.get(url);
    // // const result = res.data;
    // const result = res.data.response.body.items.item;
    // console.log(result);

    //2. server-side : Api Routes
    const res = await fetch("/api/weather?type=1");
    const result = await res.json();
    console.log(result);

    const res2 = await fetch("/api/weather?type2");
    const result2 = await res2.json();
    console.log(result2);
  };
  return (
    <div>
      <button onClick={goApiSend}>api 통신</button>
    </div>
  );
}
