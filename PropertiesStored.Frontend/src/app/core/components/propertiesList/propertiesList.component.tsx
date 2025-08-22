import propertyModel from "../../../properties/models/property.model";
import PropertyCard from "../../../properties/components/propertyCard/propertyCard.component";
import { LAYOUT_CONSTANTS } from "../../constants/layout.constants";

interface PropertiesListProps {
  properties: propertyModel[];
}

const PropertiesList: React.FC<PropertiesListProps> = ({ properties }) => (
  <div className={`grid grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.MOBILE} sm:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.TABLET} lg:grid-cols-${LAYOUT_CONSTANTS.GRID.COLUMNS.DESKTOP} ${LAYOUT_CONSTANTS.GRID.GAP} ${LAYOUT_CONSTANTS.GRID.JUSTIFY} ${LAYOUT_CONSTANTS.GRID.MARGIN_BOTTOM}`}>
    {properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    ))}
  </div>
);

export default PropertiesList;
