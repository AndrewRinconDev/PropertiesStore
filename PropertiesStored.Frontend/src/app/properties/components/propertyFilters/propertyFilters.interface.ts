import { Dispatch, SetStateAction } from "react";
import { PropertyFilter } from "../../../core/hooks/useProperties";

interface IPropertyFiltersProps {
  filter: PropertyFilter;
  setFilter: Dispatch<SetStateAction<PropertyFilter>>;
  getFilteredProperties: () => Promise<void>;
}

export default IPropertyFiltersProps;