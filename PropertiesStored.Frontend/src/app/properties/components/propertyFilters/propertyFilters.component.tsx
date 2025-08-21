import IPropertyFiltersProps from "./propertyFilters.interface";

function PropertyFilters({
  filter,
  setFilter,
  getFilteredProperties,
}: IPropertyFiltersProps) {
  const clearHandler = () => {
    setFilter({ name: "", address: "", minPrice: "", maxPrice: "" });
  };

  return (
    <div className="flex flex-wrap w-full p-4 gap-3 md:w-64 md:flex-col justify-center md:justify-start">
      <h2 className="text-xl font-bold mb-4 w-full text-center md:text-left">
        Filters
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={filter.name}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Address"
        value={filter.address}
        onChange={(e) => setFilter({ ...filter, address: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filter.minPrice}
        onChange={(e) => setFilter({...filter, minPrice: e.target.value })}
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filter.maxPrice}
        onChange={(e) => setFilter({...filter, maxPrice: e.target.value })}
        
        className="mb-2 p-2 border border-gray-300 rounded"
      />
      <div className="flex gap-2 w-full justify-center md:justify-start">
        <button
          onClick={clearHandler}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded md:w-full w-auto"
        >
          Reset
        </button>
        <button
          onClick={getFilteredProperties}
          className="bg-blue-900 text-white px-6 py-2 rounded md:w-full w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default PropertyFilters;
