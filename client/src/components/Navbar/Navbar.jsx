import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import DropdownMenu from "./Dropdown";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../../assets/logo.png'
import { useEffect } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/Auth/Actions";
import { getUser } from "../../Redux/Auth/Actions";
import VariantAvatars from "../Avatar";
const navigation = [
  { name: "Home", href: "#", current: true, hasDropdown: false },
  {
    name: "Ingredients",
    href: "#",
    current: false,
    hasDropdown: true,
    dropdownItems: [
      { name: "Fruits", href: "#" },
      { name: "Vegetables", href: "#" },
      { name: "Dairy", href: "#" }, 
      { name: "Cheese", href: "#" },
      { name: "Pasta", href: "#" },
    ],
  },
  {
    name: "Cuisines",
    href: "#",
    current: false,
    hasDropdown: true,
    dropdownItems: [
      { name: "Italian", href: "#" },
      { name: "Mexican", href: "#" },
      { name: "Indian", href: "#" },
      { name: "chinese", href: "#" },
      { name: "american", href: "#" },
      { name: "thai", href: "#" },
      { name: "french", href: "#" },
      { name: "japanese", href: "#" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store)
  const handleLoginBtn = () => {
    navigate('/auth/login')
  }
  const handleRegisterBtn = () => {
    navigate('/auth/register')
  }
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])



  const isAuthenticate = localStorage.getItem('jwt')
  return (
    <Disclosure as="nav" className="bg-[#01161e] lg:px-8 py-1  z-10 w-full filter backdrop-blur-sm">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-[#FF6216] ">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://e7.pngegg.com/pngimages/854/415/png-clipart-recipe-cooking-chef-dish-food-cooking-food-recipe-thumbnail.png"
                className="lg:block h-[35px] w-[35px] object-cover object-top rounded-full hidden"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) =>
                  item.hasDropdown ? (
                    <DropdownMenu
                      key={item.name}
                      title={item.name}
                      items={item.dropdownItems}
                    />
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "text-[#FF6216] border-b-[#FF6216] border-b"
                          : "text-gray-300 hover:text-[#FF6216] hover:border-b-[#FF6216] hover:border-b-2",
                        " px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
            <SearchBar />

          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">










            {isAuthenticate ?
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <VariantAvatars username={auth?.user?.fullName} />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                      onClick={() => navigate('/user/profile')}
                    >
                      My Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => navigate('/user/add-Recipe')}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                    >
                      Add a recipe
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 w-full text-left"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu> :
              <div className="flex gap-4 items-center sm:block hidden">
                <button className="text-white hover:border hover:text-[#FF6216] hover:border-[#FF6216] rounded py-1 px-2 font-semibold transition duration-900 ease-in-out mr-2" onClick={handleLoginBtn}>
                  Login
                </button>

                <span className="text-white mr-2">|</span>

                <button className="text-white border border-neutral-100 rounded py-1 px-2" onClick={handleRegisterBtn}>
                  Register
                </button>
              </div>

            }


            {/* */}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        {!isAuthenticate ?
          <div className="flex gap-4 items-center sm:block hidden">
            <button className="text-white hover:border hover:text-[#FF6216] hover:border-[#FF6216] rounded py-1 px-2 font-semibold transition duration-900 ease-in-out mr-2" onClick={handleLoginBtn}>
              Login
            </button>

            <span className="text-white mr-2">|</span>

            <button className="text-white border border-neutral-100 rounded py-1 px-2" onClick={handleRegisterBtn}>
              Register
            </button>
          </div>

          : <></>
        }

      </DisclosurePanel>
    </Disclosure>
  );
}
