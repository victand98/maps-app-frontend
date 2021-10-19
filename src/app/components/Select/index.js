import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import * as Hi from "react-icons/hi";

export const Select = ({ options, onChange, value, ...rest }) => {
  return (
    <Listbox value={value} onChange={onChange} {...rest}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{value.label}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <Hi.HiOutlineSelector
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, key) => (
              <Listbox.Option key={option.value} value={option} as={Fragment}>
                {({ selected, active }) => (
                  <li
                    className={`${
                      active ? "text-purple-900 bg-amber-100" : "text-gray-900"
                    } cursor-default select-none relative py-2 pl-10 pr-4`}
                  >
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-purple-600" : "text-purple-600"
                        } absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <Hi.HiCheck className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
