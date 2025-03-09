import React from 'react'
import PropTypes from 'prop-types'

const Sidebar = ({
  sections,
  activeSection,
  completedSections,
  onSectionChange,
}) => (
  <div className="w-[19.8125rem] bg-gray-100 flex-col items-center ">
    <h2 className="text-xl font-bold mb-6">Progress</h2>
    <ul className="space-y-4">
      {sections?.map((section, index) => (
        <li
          key={index}
          className={`flex items-center cursor-pointer ${
            index === activeSection
              ? 'text-blue-600 font-semibold'
              : 'text-gray-600'
          }`}
          onClick={() => onSectionChange(index)}
        >
          <span className="mr-2">
            {completedSections.has(index) ? (
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="w-5 h-5 border-2 border-gray-300 rounded-full inline-block" />
            )}
          </span>
          {section}
        </li>
      ))}
    </ul>
  </div>
)

Sidebar.propTypes = {
  // ... prop type definitions
}

export default Sidebar
