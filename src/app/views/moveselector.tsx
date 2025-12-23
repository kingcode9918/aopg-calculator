export type MoveCategory = "fighting" | "sword" | "gun" | "support" | "fruit";

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
];

const MoveSelector = ({ onSelect, selected }: MoveSelectorProps) => (
  <div className="w-full flex justify-center py-2">
    <div className="tabs tabs-boxed flex flex-wrap">
      {moveTabs.map(({ key, label, text }) => (
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

export default MoveSelector;
