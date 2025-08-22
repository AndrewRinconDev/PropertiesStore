import PropertyDescription from "../propertyDescription/propertyDescription.component";
import propertyModel from "../../models/property.model";

interface PropertyInfoSectionProps {
  propertyData: propertyModel;
}

function PropertyInfoSection({ propertyData }: PropertyInfoSectionProps) {
  return (
    <div className="order-2">
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
        <PropertyDescription propertyData={propertyData} />
      </div>
    </div>
  );
}

export default PropertyInfoSection;
