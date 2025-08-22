import ImagesGallery from "../../../core/components/imagesGallery/ImagesGallery.component";
import { getImageData } from "../../../core/utilities/getImageData.ts/getImageData";
import propertyModel from "../../models/property.model";

interface PropertyImagesSectionProps {
  propertyData: propertyModel;
}

function PropertyImagesSection({ propertyData }: PropertyImagesSectionProps) {
  return (
    <div className="order-1">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <ImagesGallery
          imagesSrc={getImageData(propertyData.images)}
          alt={propertyData.name}
        />
      </div>
    </div>
  );
}

export default PropertyImagesSection;
