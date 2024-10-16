import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';

export default function DropdownMenu({ title, items }) {
  const navigate = useNavigate();
  const handleItemClick = (item) => {
    // Navigate to the recipe page with selected item as query parameter
    navigate(`/user/recipes?filter=${item.name.toLowerCase()}`);
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <MenuButton className="inline-flex justify-center text-white hover:text-[#FF6216] hover:border-b border-b-[#fb8500] px-3 py-2 text-sm font-medium">
        {title}
        <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
      </MenuButton>
      <MenuItems className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
        {items.map((item) => (
          <MenuItem key={item.name}>
            <a
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}