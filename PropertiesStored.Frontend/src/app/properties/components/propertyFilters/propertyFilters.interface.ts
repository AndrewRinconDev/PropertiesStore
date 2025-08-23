import { Dispatch, SetStateAction } from "react";
import { PropertyFilter } from "../../../core/types/property.types";

interface IPropertyFiltersProps {
  filter: PropertyFilter;
  setFilter: Dispatch<SetStateAction<PropertyFilter>>;
  applyFilters: () => void;
  resetFilters: () => void;
}

export default IPropertyFiltersProps;