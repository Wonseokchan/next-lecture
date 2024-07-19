// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  // console.log("req:", req.method);
  console.log("req.query:", req);

  const { method, query } = req;

  const key =
    "s9LtJ4f28XKtHHjtRa94y0gWEWaArpqpuNkbkpRyVgYYyLDPigB20QyFaSduFmFXXydgwTJSD4Ef53t5Z1%2BnFg%3D%3D";

  const url = `http://apis.data.go.kr/1360000/MidFcstInfoService/getMidFcst?serviceKey=${key}&numOfRows=10&pageNo=1&stnId=133&tmFc=202407160600&dataType=JSON`;
  try {
    switch (query.type) {
      case "1":
        const response = await axios.get(url);
        console.log(">>", response.data);
        res.status(200).json(response.data.response.body.items);
      case "2":
        const response2 = await axios.get(url);
        console.log(">>", response2.data);
        res.status(200).json(response2.data.response.body.items);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
