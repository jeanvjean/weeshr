import {
  Document
} from 'mongoose';

export enum DriverStatus {
    ACTIVE = 'active',
    DEACTIVATED='deactivated',
    SUSPENDED = 'suspended',
    INACTIVE = 'inactive'
}

export type Location = {
    type: number;
}

export interface LocationInterface {
type: string;
coordinates: {
    type: Location[];
    index: '2dspare';
};
}

export type checkCar = {
    email: string;
    car_number: string;
    license_number: string;
    phone_number: string;
}

export interface DriverInterface extends Document{
    name: string;
    email: string;
    phoneNumber: string;
    licenseNumber: string;
    carNumber: string;
    isVerified: boolean;
    status: DriverStatus;
    location?: LocationInterface;
}

export interface CreateDriver {
    name: DriverInterface['name'];
    email: DriverInterface['email'];
    phone_number: DriverInterface['phoneNumber'];
    license_number: DriverInterface['licenseNumber'];
    car_number: DriverInterface['carNumber'];
}

export type VerifyMail = {
    email: string;
}

export type SearchQuery = {
    longitude: number;
    latitude: number;
}
