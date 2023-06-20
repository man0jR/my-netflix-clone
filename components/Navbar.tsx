import Mobilemenu from "./MobileMenu";
import Navbaritem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import { useState, useCallback, useEffect } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showbackground, setShowBackground] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(!showMobileMenu);
  }, [showMobileMenu]);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(!showAccountMenu);
  }, [showAccountMenu]);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row 
      items-center transition duration-500 
      ${showbackground && "bg-zinc-900 bg-opacity-90"}`}
      >
        <img src="/images/logo.png" className="h-4 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <Navbaritem label="Home" />
          <Navbaritem label="Series" />
          <Navbaritem label="Films" />
          <Navbaritem label="New & Popular" />
          <Navbaritem label="My List" />
          <Navbaritem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu && "rotate-180"
            }`}
          />
          <Mobilemenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-green.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu && "rotate-180"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
