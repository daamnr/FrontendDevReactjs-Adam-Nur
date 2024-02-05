import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Cards from "./Cards";

const sortOptions = [
  { name: "Popularity", href: "#", current: false },
  { name: "Best Rating", href: "#", current: false },
  { name: "Open Now", href: "#", current: false },
];

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  const setCurrentSortOption = (option) => {
    sortOptions.forEach((opt) => (opt.current = opt === option));
    setSelectedSortOption(option);
  };

  function classNames(...classNamees) {
    return classNamees.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          <h1 className="text-2xl font-regular text-gray-800">
            All Restaurants
          </h1>
          <div className="">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center p-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            onClick={() => setCurrentSortOption(option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <Cards selectedSortOption={selectedSortOption} />
      </div>
    </>
  );
};

export default Home;
