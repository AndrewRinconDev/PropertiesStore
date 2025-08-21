import propertyModel from "../../models/property.model";

export type IPropertyDescription = Omit<propertyModel, "propertyImages">;

interface IPropertyDescriptionProps {
  propertyData: IPropertyDescription;
}

export default IPropertyDescriptionProps;
