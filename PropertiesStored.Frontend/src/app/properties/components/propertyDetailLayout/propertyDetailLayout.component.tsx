import PropertyHeader from "../propertyHeader/propertyHeader.component";
import PropertyImagesSection from "../propertyImagesSection/propertyImagesSection.component";
import PropertyInfoSection from "../propertyInfoSection/propertyInfoSection.component";
import propertyModel from "../../models/property.model";

interface PropertyDetailLayoutProps {
  propertyData: propertyModel;
}

function PropertyDetailLayout({ propertyData }: PropertyDetailLayoutProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <PropertyHeader 
          name={propertyData.name} 
          address={propertyData.address} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Gallery */}
          <PropertyImagesSection propertyData={propertyData} />
          
          {/* Property Information */}
          <PropertyInfoSection propertyData={propertyData} />
        </div>
      </div>
    </section>
  );
}

export default PropertyDetailLayout;
