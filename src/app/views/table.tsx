import { useState } from "react";

/* eslint-disable */
interface GenericTableProps<T extends Record<string, any>> {
  data: T[];
}

const emojiMap: Record<string, string> = {
  name: "",
  strength: "💪",
  stamina: "⚡",
  defense: "🛡️",
  sword: "🗡️",
  gun: "🔫",
  haki: "👑",
  fruit: "🍇",
};

const GenericTable = <T extends Record<string, any>>({
  /* eslint-enable */
  data,
}: GenericTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  if (!data.length)
    return (
      <div className="flex justify-center items-center py-8 opacity-60">
        <span>No data available.</span>
      </div>
    );

  const headers = Object.keys(data[0]).filter((key) => key !== "id");

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
    <div className="overflow-x-auto flex justify-center">
      <table className="table table-zebra bg-base-100 custom-table min-w-[600px]">
        <thead className="sticky top-0 z-10 bg-base-100">
          <tr>
            {headers.map((key) => (
              <th
                key={key}
                className={`capitalize cursor-pointer select-none ${
                  typeof data[0][key] === "number" ? "text-right" : ""
                }`}
                onClick={() => handleSort(key)}
              >
                {emojiMap[key] && `${emojiMap[key]} `}
                {key.replace(/([A-Z])/g, " $1")}
                {sortKey === key && (sortDirection === "asc" ? " ▲" : " ▼")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center opacity-60 py-8"
              >
                No data available.
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr key={idx}>
                {headers.map((key) => (
                  <td
                    key={key}
                    className={typeof row[key] === "number" ? "text-right" : ""}
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
