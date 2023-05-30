
export enum DriverStatus {
  ACTIVE = 'active',
  DEACTIVATED='deactivated',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export interface DriverInterface {
  name: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  carNumber: string;
  isVerified: boolean;
  status: DriverStatus;
  location?: string;
}
