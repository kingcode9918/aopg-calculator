import { useEffect, useState } from "react";
import { useDevMode } from "../hooks/devmode";
const moveKeys = ["M1", "Q", "E", "R", "F", "G", "T", "U", "Y"];

interface MoveResult {
  base: number;
  scaled: number;
  scale?: string;
}

interface RecordEntry {
  timestamp: number;
  title?: string;
  moves: Record<string, MoveResult>;
}

type SortKey =
  | "title"
  | "total"
  | `${(typeof moveKeys)[number]}.base`
  | `${(typeof moveKeys)[number]}.scaled`
  | `${(typeof moveKeys)[number]}.scale`;

const DamageTable = () => {
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("title");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("aopg_calculator_dev_saved");
    if (data) {
      try {
        setRecords(JSON.parse(data));
      } catch {
        setRecords([]);
      }
    }
  }, []);

  // Compute total damage for a record
  const getTotal = (rec: RecordEntry) =>
    moveKeys.reduce((sum, key) => sum + (rec.moves[key]?.scaled ?? 0), 0);

  // Sorting logic
  const sortedRecords = [...records].sort((a, b) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let aVal: any, bVal: any;
    if (sortKey === "title") {
      aVal = a.title ?? "";
      bVal = b.title ?? "";
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (sortKey === "total") {
      aVal = getTotal(a);
      bVal = getTotal(b);
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    // moveKeys columns
    const [move, field] = sortKey.split(".");
    aVal =
      a.moves[move]?.[field as keyof MoveResult] ??
      (field === "scale" ? "" : 0);
    bVal =
      b.moves[move]?.[field as keyof MoveResult] ??
      (field === "scale" ? "" : 0);
    if (field === "scale") {
      return sortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  // Helper to set sort key and toggle asc/desc
  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((asc) => !asc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  if (!useDevMode()) {
    return (
      <div className="text-center text-gray-500 mt-8">
        This feature is only available in Dev Mode.
      </div>
    );
  }

  if (!records.length) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No saved computations found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-8">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => handleSort("title")}>
              Title {sortKey === "title" && (sortAsc ? "▲" : "▼")}
            </th>
            {moveKeys.map((key) => (
              <th key={key}>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort(`${key}.base`)}
                >
                  {key} Base{" "}
                  {sortKey === `${key}.base` && (sortAsc ? "▲" : "▼")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort(`${key}.scaled`)}
                >
                  {key} Scaled{" "}
                  {sortKey === `${key}.scaled` && (sortAsc ? "▲" : "▼")}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleSort(`${key}.scale`)}
                >
                  {key} Scale{" "}
                  {sortKey === `${key}.scale` && (sortAsc ? "▲" : "▼")}
                </div>
              </th>
            ))}
            <th className="cursor-pointer" onClick={() => handleSort("total")}>
              Total Damage {sortKey === "total" && (sortAsc ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRecords.map((rec, idx) => (
            <tr key={(rec.timestamp ?? idx) + "-" + idx}>
              <td>
                <span className="font-bold">{rec.title ?? "-"}</span>
              </td>
              {moveKeys.map((key) => (
                <td key={key}>
                  <div>
                    <span className="font-mono text-xs text-gray-500">
                      {rec.moves[key]?.base?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-green-700">
                      {rec.moves[key]?.scaled?.toLocaleString() ?? "-"}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-blue-700">
                      {rec.moves[key]?.scale ?? "-"}
                    </span>
                  </div>
                </td>
              ))}
              <td>
                <span className="font-mono text-lg text-red-700">
                  {getTotal(rec).toLocaleString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DamageTable;
