import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm w-full top-0 left-0 z-50">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Verse Calculator
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
