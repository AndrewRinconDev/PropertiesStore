import propertyModel from "../../../properties/models/property.model";
import PropertyCard from "../../../properties/components/propertyCard/propertyCard.component";

interface PropertiesListProps {
  properties: propertyModel[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-6 justify-items-stretch mb-8">
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
);

export default PropertiesList;
