import IPropertyFiltersProps from "./propertyFilters.interface";
import { FILTER_CONSTANTS } from "../../../core/constants/pagination.constants";

function PropertyFilters({
  filter,
  setFilter,
  getFilteredProperties,
}: IPropertyFiltersProps) {
  const clearHandler = () => {
    setFilter(FILTER_CONSTANTS.DEFAULT_FILTER);
  };

  return (
    <div className="w-full lg:w-80 p-6 lg:p-8 bg-white/80 backdrop-blur-sm border-r border-slate-200/50 shadow-lg">
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Filters</h2>
          <p className="text-slate-600 text-sm">Refine your property search</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Property Name</label>
            <input
              type="text"
              placeholder="Enter property name..."
              value={filter.name}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter address..."
              value={filter.address}
              onChange={(e) => setFilter({ ...filter, address: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Min Price</label>
              <input
                type="number"
                placeholder="Min"
                value={filter.minPrice}
                onChange={(e) => setFilter({...filter, minPrice: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max"
                value={filter.maxPrice}
                onChange={(e) => setFilter({...filter, maxPrice: e.target.value })}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-4">
          <button
            onClick={getFilteredProperties}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl border border-blue-500/20"
          >
            🔍 Search Properties
          </button>
          <button
            onClick={clearHandler}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl border border-gray-400/20"
          >
            🗑️ Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyFilters;
