import Link from "next/link";

interface PropertyHeaderProps {
  name: string;
  address: string;
}

function PropertyHeader({ name, address }: PropertyHeaderProps) {
  return (
    <div className="md:mb-8 w-full flex flex-wrap justify-between items-center">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {name}
        </h1>
        <p className="text-xl text-gray-600 flex items-center gap-2">
          <span className="text-blue-500 text-2xl">📍</span>
          {address}
        </p>
      </div>
      {/* Back Button - Floating style */}
      <div className="relative flex w-full md:w-1/3 lg:w-1/2 justify-end py-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <span className="text-lg">⬅️</span>
          Back to Properties
        </Link>
      </div>
    </div>
  );
}

export default PropertyHeader;
