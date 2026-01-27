interface AccessorySelectorProps {
  onSelect: (value: "head" | "top" | "arm" | "back" | "waist" | "legs") => void;
  selected: string;
}

const accTabs = [
  { key: "head", label: "Head", text: "text-primary" },
  { key: "top", label: "Top", text: "text-secondary" },
  { key: "arm", label: "Arm", text: "text-accent" },
  { key: "back", label: "Back", text: "text-info" },
  { key: "waist", label: "Waist", text: "text-error" },
  { key: "legs", label: "Legs", text: "text-warning" },
];

const AccessorySelector = ({ onSelect, selected }: AccessorySelectorProps) => (
  <div className="w-full flex justify-center py-2">
    <div className="tabs tabs-boxed">
      {accTabs.map(({ key, label, text }) => (
        <a
          key={key}
          className={`tab tab-lg ${
            selected === key ? "tab-active" : ""
          } ${text} font-bold`}
          onClick={() =>
            onSelect(key as "head" | "top" | "arm" | "back" | "waist" | "legs")
          }
        >
          {label}
        </a>
      ))}
    </div>
  </div>
);

export default AccessorySelector;
