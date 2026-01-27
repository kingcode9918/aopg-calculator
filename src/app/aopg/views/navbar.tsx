import Link from "next/link";

interface NavbarProps {
  onSelect: (value: "build" | "accessory" | "buff" | "move") => void;
  selected: "build" | "accessory" | "buff" | "move";
}

const Navbar = ({ onSelect, selected }: NavbarProps) => {
  const navItems: {
    key: "build" | "accessory" | "buff" | "move";
    label: string;
  }[] = [
    { key: "build", label: "Build" },
    { key: "accessory", label: "Accessory" },
    { key: "buff", label: "Buff" },
    { key: "move", label: "Move" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm w-full top-0 left-0 z-50">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          AOPG Calculator
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {navItems.map(({ key, label }) => (
            <li key={key}>
              <a
                className={selected === key ? "font-bold text-primary" : ""}
                onClick={() => onSelect(key)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
