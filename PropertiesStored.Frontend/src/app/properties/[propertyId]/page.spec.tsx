import { render, screen, waitFor } from "@testing-library/react";
import PropertiesPage from "./page";
import * as PropertyService from "../../properties/services/property.service";
import propertyModel from "../../properties/models/property.model";

jest.mock("../../properties/services/property.service");
jest.mock(
  "../../core/components/loadingOverlay/loadingOverlay.component",
  () => jest.fn(() => <div>Loading...</div>)
);
jest.mock("next/navigation", () => ({
  useParams: jest.fn(() => ({ propertyId: "1" })),
}));

describe("PropertiesPage", () => {
  const mockProperties: propertyModel = {
    idProperty: "1",
    name: "Property 1",
    address: "Address 1",
    price: 100,
    owner: {
      idOwner: "1",
      name: "Owner 1",
      photo: "/photo.jpg",
    },
  } as propertyModel;

  it("should render loading overlay initially", () => {
    render(<PropertiesPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render property cards after loading", async () => {
    const getPropertyByIdSpy = jest
      .spyOn(PropertyService, "getPropertyById")
      .mockReturnValue(Promise.resolve(mockProperties));

    render(<PropertiesPage />);

    expect(screen.queryByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Property 1")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(getPropertyByIdSpy).toHaveBeenCalled();
    });
  });

  it("should render owner property cards after loading", async () => {
    const getPropertyByIdSpy = jest
      .spyOn(PropertyService, "getPropertyById")
      .mockReturnValue(Promise.resolve(mockProperties));

    render(<PropertiesPage />);

    expect(screen.queryByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Owner")).toBeInTheDocument();
      expect(screen.getByAltText("owner-Property 1")).toBeInTheDocument();
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(getPropertyByIdSpy).toHaveBeenCalled();
    });
  });

  it("should render loading if not found", async () => {
    const getPropertyByIdSpy = jest
      .spyOn(PropertyService, "getPropertyById")
      .mockReturnValue(Promise.resolve(null));

    render(<PropertiesPage />);

    expect(screen.queryByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(getPropertyByIdSpy).toHaveBeenCalled();
      expect(screen.queryByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Property 1")).not.toBeInTheDocument();
    });
  });
});
