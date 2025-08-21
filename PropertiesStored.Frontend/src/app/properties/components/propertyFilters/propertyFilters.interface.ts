import { Dispatch, SetStateAction } from "react";

interface IPropertyFiltersProps {
  filter: Record<string, string>;
  setFilter: Dispatch<SetStateAction<Record<string, string>>>;
  getFilteredProperties: () => Promise<void>;
}

export default IPropertyFiltersProps;