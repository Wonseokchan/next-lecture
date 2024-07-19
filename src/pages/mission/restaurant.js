import { useEffect, useState } from "react";

export default function Restaurant() {
  const [list, setList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const data = async () => {
    const res = await fetch(`/api/restaurant?num=${pageNo}&type=1`);
    const result = await res.json();
    setMaxPage(Math.ceil(result.totalCount / 9));

    setList(result.items);
  };

  useEffect(() => {
    data();
  }, [pageNo]);

  const nextBtn = () => {
    if (pageNo < maxPage) {
      setPageNo(pageNo + 1);
    } else {
      alert("더 이상 자료가 없습니다");
    }
  };
  const prevBtn = () => {
    if (pageNo == 1) {
      return;
    } else {
      setPageNo(pageNo - 1);
    }
  };
  const resetBtn = () => {
    setPageNo(1);
  };

  return (
    <div>
      <div className="p-6">
        <h1>대전광역시 모범음식점</h1>
        <p>대전광역시 문화관광 모범음식점입니다.</p>
        <p>2024년 대전광역시 기업매칭 지업사업 결과물입니다.</p>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {list.map((v, i) => {
            return (
              <>
                <div key={i} className="overflow-hidden rounded-2xl bg-gray-50">
                  <div className="flex items-center h-[180px] overflow-hidden">
                    <img
                      src={`/images/food${Math.floor(
                        Math.random() * 13 + 1
                      )}.png`}
                      alt="Random Food"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                      <div>
                        <p className="text-gray-400">{v.restrntSumm}</p>
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">
                          {v.restrntNm}
                        </h2>
                        <p className="text-gray-400">{v.restrntAddr}</p>
                      </div>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <div className="flex flex-wrap justify-between">
                      <p className="inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 stroke-orange-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span className="ml-2 text-gray-600">{v.salsTime}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div className="items-center justify-center text-center">
        <button onClick={prevBtn} className="border mx-1 px-3">
          이전
        </button>
        <button onClick={resetBtn} className="border mx-1 px-3">
          초기화
        </button>
        <button onClick={nextBtn} className="border mx-1 px-3">
          다음
        </button>
      </div>
    </div>
  );
}
