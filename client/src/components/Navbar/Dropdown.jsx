import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function DropdownMenu({ title, items, filterType, onFilterChange }) {
  const handleFilter = (name, id) => {
    console.log(name, id, "datataa")
    onFilterChange(filterType, id);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center text-black hover:text-[#FF6216] hover:border-b-2 border-b-[#fb8500] px-3 py-2 text-md font-medium">
        {title}
        <ChevronDownIcon className="-mr-1 h-5 w-5" aria-hidden="true" />
      </MenuButton>

      <MenuItems className="absolute left-0 z-10 mt-2 w-full sm:w-56 md:w-64 lg:w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item) => (
          <MenuItem key={item.id}>
            <div
              className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
              onClick={() => handleFilter(item.name, item.id)}
            >
              {item.name}
            </div>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
