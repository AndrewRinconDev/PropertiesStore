import IPropertyDescriptionProps from "./propertyDescription.interface";

import "./propertyDescription.style.css";
import Image from "next/image";

function PropertyDescription({ propertyData }: IPropertyDescriptionProps) {
  return (
    <div className="space-y-6">
      

      {/* Price Display */}
      <div className="text-center lg:text-left">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl shadow-lg">
          <p className="text-sm text-blue-100 mb-1">Property Price</p>
          <p className="text-3xl lg:text-4xl font-bold">
            ${propertyData.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Code</p>
            <p className="font-semibold text-gray-900">{propertyData.codeInternal}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Year</p>
            <p className="font-semibold text-gray-900">{propertyData.year}</p>
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-blue-500">👤</span>
          Property Owner
        </h2>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={propertyData.owner.photo}
              alt={`Owner: ${propertyData.owner.name}`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">{propertyData.owner.name}</p>
            <p className="text-gray-600 text-sm">{propertyData.owner.address}</p>
            {propertyData.owner.birthday && (
              <p className="text-gray-500 text-xs">
                Birthday: {new Date(propertyData.owner.birthday).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Property Images Count */}
      {propertyData.images && propertyData.images.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm font-medium">
            📸 {propertyData.images.length} image{propertyData.images.length !== 1 ? 's' : ''} available
          </p>
        </div>
      )}
    </div>
  );
}

export default PropertyDescription;
