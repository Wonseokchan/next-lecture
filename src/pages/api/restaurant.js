// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  console.log(">>>", req.query);
  const key =
    "s9LtJ4f28XKtHHjtRa94y0gWEWaArpqpuNkbkpRyVgYYyLDPigB20QyFaSduFmFXXydgwTJSD4Ef53t5Z1%2BnFg%3D%3D";

  const url = `https://apis.data.go.kr/6300000/openapi2022/restrnt/getrestrnt?serviceKey=${key}&pageNo=${query.num}&numOfRows=9`;

  try {
    switch (query.type) {
      case "1":
        const response = await axios.get(url);
        res.status(200).json(response.data.response.body);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
}
