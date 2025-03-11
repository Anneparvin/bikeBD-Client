
export enum BikeBrand {
  Honda = "Honda",
  Yamaha = "Yamaha",
  Suzuki = "Suzuki",
  Bajaj = "Bajaj",
  KTM = "KTM",
  RoyalEnfield = "Royal Enfield",
  Ducati = "Ducati",
  HarleyDavidson = "Harley Davidson",
  Kawasaki = "Kawasaki",
  BMW = "BMW",
  TVS = "TVS",
  Hero = "Hero",
  Aprilia = "Aprilia"
}

export type TBikeType = 'Cruiser' | 'Sport' | 'Touring' | 'Adventure' | 'Dirt' | 'Electric';

export enum BikeType {
  Cruiser = "Cruiser",
  Sport = "Sport",
  Touring = "Touring",
  Adventure = "Adventure",
  Dirt = "Dirt",
  Electric = "Electric"
}


// Bike Stock Status
export type BikeStatus = "Stock" | "Stock Out";

// Bike Product Interface
export interface TBike {
  _id: string;
  name: string;
  brand: BikeBrand;
  price: number;
  model: string;
  type: TBikeType;
  description: string;
  stock: number;
  status: BikeStatus;
  isDeleted: boolean;
  bikeImage: string;
}

