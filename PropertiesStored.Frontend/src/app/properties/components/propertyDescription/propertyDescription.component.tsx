import Link from "next/link";

import IPropertyDescriptionProps from "./propertyDescription.interface";

import "./propertyDescription.style.css";
import Image from "next/image";

function PropertyDescription({ propertyData }: IPropertyDescriptionProps) {
  return (
    <div className="property-description-container">
      <div className="back-button-container">
        <Link href="/">{"⬅️ Back"}</Link>
      </div>
      <h1 className="property-title">{propertyData.name}</h1>
      <p>{propertyData.address}</p>
      <p>
        {propertyData.codeInternal} - {propertyData.year}
      </p>
      <p className="text-blue-800 font-bold !text-2xl">
        ${propertyData.price.toLocaleString()}
      </p>

      <div className="owner-description-container">
        <h2>Owner</h2>
        <div className="owner-info-container">
          <div className="owner-image-container">
            <Image
            src={propertyData.owner.photo}
            alt={`owner-${propertyData.name}`}
            fill />
          </div>
          <p>{propertyData.owner.name}</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDescription;
