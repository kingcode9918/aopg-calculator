export type BuffCategory =
  | "title"
  | "race"
  | "fruit"
  | "fighting"
  | "gun"
  | "sword"
  | "armament"
  | "conqueror"
  | "blacksmith"
  | "giant"
  | "suit"
  | "support";

interface BuffSelectorProps {
  onSelect: (value: BuffCategory) => void;
  selected: BuffCategory;
}

const buffTabs: {
  key: BuffCategory;
  label: string;
  text: string;
}[] = [
  { key: "title", label: "Title", text: "text-primary" },
  { key: "race", label: "Race", text: "text-secondary" },
  { key: "fruit", label: "Fruit", text: "text-accent" },
  { key: "fighting", label: "Fighting", text: "text-info" },
  { key: "gun", label: "Gun", text: "text-error" },
  { key: "sword", label: "Sword", text: "text-warning" },
  { key: "armament", label: "Armament", text: "text-success" },
  { key: "conqueror", label: "Conqueror", text: "text-purple-400" },
  { key: "blacksmith", label: "Blacksmith", text: "text-orange-400" },
  { key: "giant", label: "Giant", text: "text-pink-400" },
  { key: "suit", label: "Suit", text: "text-cyan-400" },
  { key: "support", label: "Support", text: "text-lime-400" },
];

const BuffSelector = ({ onSelect, selected }: BuffSelectorProps) => (
  <div className="w-full flex justify-center py-2">
    <div className="tabs tabs-boxed flex flex-wrap">
      {buffTabs.map(({ key, label, text }) => (
        <a
          key={key}
          className={`tab tab-lg ${
            selected === key ? "tab-active" : ""
          } ${text} font-bold`}
          onClick={() => onSelect(key)}
        >
          {label}
        </a>
      ))}
    </div>
  </div>
);

export default BuffSelector;
