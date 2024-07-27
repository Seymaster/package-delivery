export interface Package {
    from_location: { lat: number, lng: number };
    to_location: { lat: number, lng: number };
    package_id: string;
    description: string;
    weight: number;
    width: number;
    height: number;
    depth: number;
    from_name: string;
    from_address: string;
    to_name: string;
    to_address: string;
    deletedAt: number;
  }