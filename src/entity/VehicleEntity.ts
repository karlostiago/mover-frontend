export class VehicleEntity {
    id: number = 0;
    brandId: number | null = 0;
    brandName: string | null;
    modelId: number | null = 0;
    modelName: string | null;
    licensePlate: string;
    yearManufacture: number;
    modelYear: number;
    nationalRegistryCode: string;
    fipeValueAtAcquisition: number;
    acquisitionValue: number;
    acquisitionDate: Date;
    availabilityDate: Date;
    mileageAtAcquisition: number;
    auction: boolean;
    fipeDepreciation: number;
    color: string;
    situation: string;
    fuelType: string | null;
    fullname: string;
    active: boolean = true;
    odometer: number | null = 0;
}
