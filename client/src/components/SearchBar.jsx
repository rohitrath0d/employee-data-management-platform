import { useState } from 'react'

const SearchBar = ({ onSearch, placeholder = 'Search employees...', totalResults }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="card p-4 sm:p-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-input block w-full pl-12 pr-12 py-4 text-slate-900 placeholder-slate-500 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          placeholder={placeholder}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
            title="Clear search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="mt-4 flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
          <div className="flex items-center space-x-2">
            {totalResults > 0 ? (
              <>
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">
                  Found <strong className="text-slate-900">{totalResults}</strong> {totalResults === 1 ? 'result' : 'results'}
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-amber-700">
                  No employees found matching "<strong>{searchTerm}</strong>"
                </span>
              </>
            )}
          </div>
          <button
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchBar
