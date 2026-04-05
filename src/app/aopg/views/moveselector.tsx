"use client";
import React from "react";

export type MoveCategory =
  | "fighting"
  | "sword"
  | "gun"
  | "support"
  | "fruit"
  | "haki";

interface MoveSelectorProps {
  onSelect: (value: MoveCategory) => void;
  selected: MoveCategory;
}

const moveTabs: {
  key: MoveCategory;
  label: string;
  text: string;
}[] = [
  { key: "support", label: "Support", text: "text-lime-400" },
  { key: "fighting", label: "Fighting", text: "text-info" },
  { key: "sword", label: "Sword", text: "text-warning" },
  { key: "gun", label: "Gun", text: "text-error" },
  { key: "fruit", label: "Devil Fruit", text: "text-accent" },
  { key: "haki", label: "Haki", text: "text-purple-600" },
];

const MoveSelector = ({ onSelect, selected }: MoveSelectorProps) => (
  <div className="w-full flex justify-center py-2">
    <div className="tabs tabs-boxed flex flex-wrap" role="tablist">
      {moveTabs.map(({ key, label, text }) => (
        <a
          key={key}
          className={`tab tab-lg ${
            selected === key ? "tab-active" : ""
          } ${text} font-bold`}
          onClick={() => onSelect(key)}
          role="tab"
          aria-selected={selected === key}
        >
          {label}
        </a>
      ))}
    </div>
  </div>
);

export default MoveSelector;
