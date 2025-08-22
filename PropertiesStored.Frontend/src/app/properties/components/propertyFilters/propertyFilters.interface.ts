import { Dispatch, SetStateAction } from "react";
import { PropertyFilter } from "../../../core/types/property.types";

interface IPropertyFiltersProps {
  filter: PropertyFilter;
  setFilter: Dispatch<SetStateAction<PropertyFilter>>;
  getFilteredProperties: () => Promise<void>;
}

export default IPropertyFiltersProps;