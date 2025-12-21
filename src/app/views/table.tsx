import { useState } from "react";

/* eslint-disable */
interface GenericTableProps<T extends Record<string, any>> {
  data: T[];
}
/* eslint-enable */

/* Emoji mapping – supports BOTH accessories & buffs */
const emojiMap: Record<string, string> = {
  name: "",

  // Accessory stats
  strength: "💪",
  stamina: "⚡",
  defense: "🛡️",
  sword: "🗡️",
  gun: "🔫",
  haki: "👑",
  fruit: "🍇",

  // Buff stats
  strengthbuff: "💪",
  swordbuff: "🗡️",
  gunbuff: "🔫",
  fruitbuff: "🍇",
};

const statClassMap: Record<string, string> = {
  strength: "custom-text-strength",
  stamina: "custom-text-stamina",
  defense: "custom-text-defense",
  sword: "custom-text-sword",
  gun: "custom-text-gun",
  haki: "custom-text-haki",
  fruit: "custom-text-fruit",

  // Buff fields
  strengthbuff: "custom-text-strength",
  swordbuff: "custom-text-sword",
  gunbuff: "custom-text-gun",
  fruitbuff: "custom-text-fruit",
};

/* Keys that should never appear as table columns */
const HIDDEN_KEYS = ["id", "image", "note", "rank"];

/* Header formatter (handles buff + normal fields) */
const formatHeader = (key: string) =>
  key
    .replace(/buff$/i, "")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GenericTable = <T extends Record<string, any>>({
  data,
}: GenericTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  if (!data.length) {
    return (
      <div className="flex justify-center items-center py-8 opacity-60">
        <span>No data available.</span>
      </div>
    );
  }

  const headers = Object.keys(data[0]).filter(
    (key) => !HIDDEN_KEYS.includes(key)
  );

  const handleSort = (key: string) => {
    setSortDirection(
      sortKey === key && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortKey(key);
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortDirection === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      })
    : data;

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra bg-base-100 w-full">
        <thead className="sticky top-0 z-10 bg-base-100">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                className={`cursor-pointer select-none ${
                  typeof data[0][key] === "number" ? "text-right" : ""
                } ${statClassMap[key] || ""}`}
                onClick={() => handleSort(key)}
              >
                {emojiMap[key] && `${emojiMap[key]} `}
                {formatHeader(key)}
                {sortKey === key && (sortDirection === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx} className="hover">
              {headers.map((key) => (
                <td
                  key={key}
                  className={`${
                    typeof row[key] === "number" ? "text-right font-medium" : ""
                  } ${statClassMap[key] || ""}`}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
