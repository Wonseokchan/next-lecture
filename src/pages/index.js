import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  //next.js에서는 a태그 사용자제 --> Link태그, router 사용권장
  const router = useRouter();
  console.log(router);
  return (
    <div className="flex-col items-center justify-center text-center">
      메인
      <ul>
        <li
          onClick={() =>
            router.push({
              pathname: "/lecture/apiSend",
              query: { id: "user1" },
            })
          }
        >
          api send
        </li>
        <li>
          <Link href="/lecture/apiSend">api send2</Link>
        </li>
        <li onClick={() => router.push("/mission/restaurant")}>레스토랑목록</li>
        <li onClick={() => router.push("/lecture/dbConnect")}>DB연결</li>
        <li onClick={() => router.push("/mission/signUp")}>회원가입하기</li>
        <li onClick={() => router.push("/mission/userInfo")}>유저정보</li>
        <li onClick={() => router.push("/mission/login")}>로그인하기</li>
      </ul>
    </div>
  );
}
