import { useDevMode } from "../hooks/devmode";
interface NavbarProps {
  onSelect: (
    value:
      | "home"
      | "title"
      | "races"
      | "accessories"
      | "calculator"
      | "damagetable"
  ) => void;
  selected: string;
}

const Navbar = ({ onSelect, selected }: NavbarProps) => {
  const dev = useDevMode();
  return (
    <div className="navbar bg-base-100 shadow-sm w-full top-0 left-0 z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">AOPG Calculator</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              className={selected === "home" ? "font-bold text-primary" : ""}
              onClick={() => onSelect("home")}
            >
              Home
            </a>
          </li>
          {/* <li>
            <a
              className={selected === "title" ? "font-bold text-primary" : ""}
              onClick={() => onSelect("title")}
            >
              Title
            </a>
          </li>
          <li>
            <a
              className={selected === "races" ? "font-bold text-primary" : ""}
              onClick={() => onSelect("races")}
            >
              Races
            </a>
          </li> */}
          <li>
            <a
              className={
                selected === "accessories" ? "font-bold text-primary" : ""
              }
              onClick={() => onSelect("accessories")}
            >
              Accessories
            </a>
          </li>
          <li>
            <a
              className={
                selected === "calculator" ? "font-bold text-primary" : ""
              }
              onClick={() => onSelect("calculator")}
            >
              Calculator
            </a>
          </li>
          {dev && (
            <li>
              <a
                className={
                  selected === "damagetable" ? "font-bold text-primary" : ""
                }
                onClick={() => onSelect("damagetable")}
              >
                Damage Table
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
