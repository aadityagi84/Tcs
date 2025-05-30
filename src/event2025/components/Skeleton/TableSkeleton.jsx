import React from "react";

// Table Skeleton Component
export const TableSkeleton = () => (
  <div className="mb-4">
    {/* Header skeleton */}
    <div className="bg-gray-100 animate-pulse h-12 border border-gray-200 border-b-0"></div>

    <div className="overflow-x-auto border border-gray-200">
      <table className="min-w-full table-fixed border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th
              className="border border-gray-200 px-3 py-2"
              style={{ width: 160 }}
            >
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            </th>
            <th
              className="border border-gray-200 px-3 py-2"
              style={{ width: 180 }}
            >
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            </th>
            {[1, 2, 3].map((col) => (
              <th
                key={col}
                className="border border-gray-200 px-3 py-2"
                style={{ width: 140 }}
              >
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              </th>
            ))}
            <th
              className="border border-gray-200 px-3 py-2"
              style={{ width: 100 }}
            >
              <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((row) => (
            <tr key={row} className={row % 2 === 1 ? "bg-gray-25" : "bg-white"}>
              <td
                className="border border-gray-200 px-3 py-2"
                style={{ width: 160 }}
              >
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              </td>
              <td
                className="border border-gray-200 px-3 py-2"
                style={{ width: 180 }}
              >
                <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
              </td>
              {[1, 2, 3].map((col) => (
                <td
                  key={col}
                  className="border border-gray-200 px-3 py-2"
                  style={{ width: 140 }}
                >
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                </td>
              ))}
              <td
                className="border border-gray-200 px-3 py-2"
                style={{ width: 100 }}
              >
                <div className="h-4 w-4 bg-gray-200 animate-pulse rounded-full mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Selected Option Skeleton Component
export const SelectedOptionSkeleton = () => (
  <div className="space-y-3">
    <div className="flex items-center space-x-3">
      <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="h-4 w-28 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="h-4 w-36 bg-gray-200 animate-pulse rounded"></div>
      <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
    </div>
  </div>
);

// Card Skeleton Component (bonus addition)
export const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5"></div>
      </div>
      <div className="flex space-x-2 pt-2">
        <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
);

// List Skeleton Component (bonus addition)
export const ListSkeleton = () => (
  <div className="space-y-3">
    {[1, 2, 3, 4].map((item) => (
      <div
        key={item}
        className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg"
      >
        <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full flex-shrink-0"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
        </div>
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      </div>
    ))}
  </div>
);

// Main Registration Loading Skeleton
export const RegistrationSkeleton = () => (
  <div className="p-4 md:p-8 lg:p-16 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Title Skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-64"></div>
        <div className="h-4 bg-gray-200 animate-pulse rounded w-96"></div>
      </div>

      {/* Tables */}
      <TableSkeleton />
      <TableSkeleton />

      {/* Selected Options */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="h-5 bg-gray-200 animate-pulse rounded w-48 mb-4"></div>
        <SelectedOptionSkeleton />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex space-x-4 justify-end">
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  </div>
);
