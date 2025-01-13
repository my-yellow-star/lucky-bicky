import { useEffect, useState } from "react";
import { API_ORIGIN } from "../lib/constant";
import { getLevelTextColor } from "../lib/function";

interface RankerModel {
  id: string;
  level: number;
  nickname: string;
  createdAt: string;
}

export function RankerList({ className }: { className?: string }) {
  const [rankers, setRankers] = useState<RankerModel[]>();

  useEffect(() => {
    async function fetchRankers() {
      const res = await fetch(`${API_ORIGIN}/api/v1/luck?sort=level&size=30`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const parsed = await res.json();
        setRankers(parsed.data as RankerModel[]);
      }
    }
    fetchRankers();
  }, []);

  return (
    <ol className={className}>
      <div className="grid pt-2 grid-cols-2 w-full font-bold">
        <h3>닉네임</h3>
        <h3>행운력</h3>
      </div>
      <hr className="my-2 border-green-600" />
      {rankers?.map((ranker) => (
        <li key={ranker.id} className="grid grid-cols-2 mb-1">
          <p style={{ color: getLevelTextColor(ranker.level) }}>
            {ranker.nickname.length > 0 ? (
              ranker.nickname
            ) : (
              <span className="text-gray-500">(이름없음)</span>
            )}
          </p>
          <strong style={{ color: getLevelTextColor(ranker.level) }}>
            {ranker.level}
          </strong>
        </li>
      ))}
    </ol>
  );
}
