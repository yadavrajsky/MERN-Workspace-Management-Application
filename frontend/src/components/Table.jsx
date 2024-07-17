import React from "react";

const TableComponent = ({ columnHeadings, children }) => {
  return (
    <div className="overflow-x-auto overflow-y-auto my-3">
      <table className="table border dark:border-gray-600 pt-1 pb-3 w-full border-gray-300 dark:bg-gray-800 dark:text-gray-100 bg-gray-100 text-gray-900 rounded">
        <thead className="text-center bg-gray-200 dark:bg-gray-900 border-b-2 border-gray-300 dark:border-gray-600">
          <tr className="lg:text-lg text-gray-900 dark:text-gray-100">
            {columnHeadings.map((columnHeading, index) => (
              <th
                key={index}
                className="min-w-[140px] py-3 px-4 border-r border-gray-300 dark:border-gray-600 last:border-0 text-center"
              >
                <span className="flex items-center justify-center gap-3">
                  {columnHeading.icon}
                  {columnHeading.label}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center bg-gray-100 dark:bg-gray-800">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
