import React from 'react';

export default function SectionInput({ section }) {
  return (
    <div className="h-auto min-h-full bg-gray-200 p-8 border border-2 border-gray-300 drop-shadow-2xl w-1/4 rounded">
      <div>
        <h1 className="text-center font-bold mb-4 text-gray-500">
          Info - Creating Section
        </h1>
      </div>
      <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-300 dark:border-gray-400 dark:text-white">
        <li className="w-full px-4 py-2 rounded-t-lg dark:border-gray-600 text-center font-bold">
          {section}
        </li>
      </ul>
      <div className="items mt-4">
        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-100 dark:border-gray-400 dark:text-gray-500">
          <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 bg-yellow-500 text-white">
            Developed fun JavaScript game
          </li>
          <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-blue-500 text-white">
            Used HTML for display and CSS for styling
          </li>
          <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-green-400 text-white">
            Developed Full-Stack web application
          </li>
          <li className="w-full px-4 py-2 rounded-b-lg bg-green-400 text-white">
            Used JWT for Auth
          </li>
        </ul>
      </div>
      <div className="my-2 mt-8">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Type next here"
        />
      </div>
      <div className="inline-block relative w-48 mr-2">
        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-500">
          <option>Normal</option>
          <option>High Priority</option>
          <option>Essential</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Add to List
      </button>
    </div>
  );
}
