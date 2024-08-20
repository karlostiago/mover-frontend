export class VehicleEntity {
    id: number = 0;
    brandId: number = 0;
    brandName: string;
    modelId: number = 0;
    modelName: string;
    licensePlate: string;
    yearManufacture: number;
    modelYear: number;
    renavam: string;
    fipeValueAtAcquisition: number;
    acquisitionValue: number;
    acquisitionDate: Date;
    availabilityDate: Date;
    mileageAtAcquisition: number;
    auction: boolean;
    fipeDepreciation: number;
    color: string;
    situation: string;
    fuelType: string;
    active: boolean = true;
}
