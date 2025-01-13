import { useEffect, useState } from "react";
import { API_ORIGIN } from "../lib/constant";
import { classNames, getLevelTextColor } from "../lib/function";

interface RankerModel {
  id: string;
  level: number;
  nickname: string;
  createdAt: string;
}

interface Props {
  className?: string;
  fromDayBefore?: number;
}

export function RankerList({ className, fromDayBefore }: Props) {
  const [rankers, setRankers] = useState<RankerModel[]>();

  useEffect(() => {
    async function fetchRankers() {
      let queryString = `sort=level&size=10`;
      if (fromDayBefore) {
        queryString += `fromDayBefore=${fromDayBefore}`;
      }

      const res = await fetch(`${API_ORIGIN}/api/v1/luck?${queryString}`, {
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
  }, [fromDayBefore]);

  function bgColorByRank(rank: number) {
    if (rank === 0) return "bg-green-primary text-green-800 font-bold";
    else if (rank === 1) return "bg-[#00f21aa0] text-green-800 font-semibold";
    else if (rank === 2) return "bg-[#00f21a70] text-green-800";
    else return "bg-gray-200 text-gray-600";
  }

  return (
    <div className={className}>
      <ol className="w-full mt-2">
        {rankers?.map((ranker, index) => (
          <li
            key={ranker.id}
            className={classNames(
              "flex items-center gap-2 mb-1 text-sm w-full py-2.5 rounded-lg",
              bgColorByRank(index)
            )}
          >
            <p className="w-10">{index + 1}</p>
            <p className="flex-1 line-clamp-1">
              {ranker.nickname.length > 0 ? ranker.nickname : "이름 없음"}
            </p>
            <div className="w-14 flex justify-end pr-2">
              <div className="aspect-square bg-[#f1f1f1] rounded-full grid place-items-center w-8 h-8">
                <strong style={{ color: getLevelTextColor(ranker.level) }}>
                  {ranker.level}
                </strong>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
