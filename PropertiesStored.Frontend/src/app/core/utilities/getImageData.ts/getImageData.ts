import { propertyImageModel } from "@/app/properties/models/property.model";

export const getImageData = (imageArray?: null | propertyImageModel[]) => {
  if (!imageArray) return [];

  return imageArray.filter((image) => image.enabled).map((image) => image.file);
};
