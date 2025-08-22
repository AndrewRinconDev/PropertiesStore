import React from 'react';

const PropertySkeleton: React.FC = () => {
  return (
    <section className="property-detail-page-section">
      <div className="property-images-container">
        {/* Image Gallery Skeleton */}
        <div data-testid="image-gallery-skeleton" className="w-full h-96 bg-gray-200 rounded-lg animate-pulse">
          <div className="flex space-x-2 p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} data-testid="thumbnail-skeleton" className="w-20 h-20 bg-gray-300 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="property-info-container">
        {/* Property Description Skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <div data-testid="title-skeleton" className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
          
          {/* Price */}
          <div data-testid="price-skeleton" className="h-10 bg-gray-200 rounded w-1/3 animate-pulse" />
          
          {/* Details Grid */}
          <div data-testid="details-grid-skeleton" className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} data-testid="detail-item-skeleton" className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
          
          {/* Owner Section */}
          <div data-testid="owner-section-skeleton" className="border-t pt-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
            <div className="flex items-center space-x-4">
              <div data-testid="owner-avatar-skeleton" className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
              <div className="space-y-2 flex-1">
                <div data-testid="owner-info-skeleton" className="h-5 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div data-testid="owner-info-skeleton" className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Property Traces */}
          <div data-testid="traces-section-skeleton" className="border-t pt-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} data-testid="trace-item-skeleton" className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertySkeleton;
