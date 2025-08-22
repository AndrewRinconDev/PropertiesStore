import PropertiesSkeleton from "../propertiesSkeleton/propertiesSkeleton.component";
import PropertiesList from "../propertiesList/propertiesList.component";
import Pagination from "../pagination/pagination.component";
import propertyModel from "../../../properties/models/property.model";
import { paginationModel } from "../../../properties/models/property.model";
import { PropertyFilter } from "../../types/property.types";

import { PropertyListProps } from "../../types/property.types";

type PropertiesContainerProps = PropertyListProps;

import { LAYOUT_CONSTANTS } from "../../constants/layout.constants";

const PropertiesContainer: React.FC<PropertiesContainerProps> = ({
  properties,
  loading,
  pagination,
  filter,
  onPageChange,
  onPageSizeChange,
}) => (
  <div className={LAYOUT_CONSTANTS.CONTAINER.MAIN_AREA}>
    {loading ? (
      <PropertiesSkeleton />
    ) : (
      <PropertiesList properties={properties} />
    )}
    
    <Pagination 
      pagination={pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      currentPage={pagination.page}
      currentPageSize={filter.pageSize}
    />
  </div>
);

export default PropertiesContainer;
