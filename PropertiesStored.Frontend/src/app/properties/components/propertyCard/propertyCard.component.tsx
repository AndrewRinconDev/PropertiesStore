import Link from "next/link";
import Image from "next/image";

import IPropertyCardProps from "./propertyCard.interface";

function PropertyCard({ property }: IPropertyCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden flex-shrink-0">
        <Image
          src={property.images[0]?.file || "/images/fallback-property-image.jpg"}
          alt={property.images[0]?.idPropertyImage || "Property Image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Price Badge Overlay */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-lg shadow-lg">
          <span className="text-sm font-semibold">${property.price.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-5 space-y-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 leading-tight">
            {property.name}
          </h3>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-blue-500 text-lg">📍</span>
            <span className="line-clamp-1">{property.address}</span>
          </p>
        </div>
        
        {/* Action Button */}
        <Link
          href={`/properties/${property.id}`}
          className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 mt-auto"
        >
          <span className="mr-2">🏠</span>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;
