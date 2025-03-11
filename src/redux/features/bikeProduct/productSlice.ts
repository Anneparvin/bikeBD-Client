import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export type TBikeBrand = 
  | "Yamaha"
  | "Honda"
  | "Suzuki"
  | "Kawasaki"
  | "Ducati"
  | "BMW"
  | "KTM"
  | "Royal Enfield"
  | "Harley Davidson"
  | "Bajaj"
  | "TVS"
  | "Hero"
  | "Aprilia";

// Bike Types
export type TBikeType = 
  | "Sport"
  | "Cruiser"
  | "Touring"
  | "Adventure"
  | "Street"
  | "Scooter"
  | "Electric";

// Bike Stock Status
export type TBikeStatus = "Stock" | "Stock Out";

// Bike Product Interface
export interface TBike {
  _id: string;
  name: string;
  brand: TBikeBrand;
  price: number;
  model: string;
  type: TBikeType;
  description: string;
  stock: number;
  status: TBikeStatus;
  isDeleted: boolean;
  bikeImage: string;
}

interface ProductState {
  products: TBike[];
  filteredProducts: TBike[];
  searchQuery: string;
  priceRange: number[];
  typeFilter: string;
  brandFilter: string;
  modelFilter: string;
  availabilityFilter: boolean | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchQuery: '',
  priceRange: [0, 10000],
  typeFilter: '',
  brandFilter: '',
  modelFilter: '',
  availabilityFilter: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TBike[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setPriceRange: (state, action: PayloadAction<number[]>) => {
      state.priceRange = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setBrandFilter: (state, action: PayloadAction<string>) => {
      state.brandFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setModelFilter: (state, action: PayloadAction<string>) => {
      state.modelFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setAvailabilityFilter: (state, action: PayloadAction<boolean | null>) => {
      state.availabilityFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    applyFilters: (state) => {
      state.filteredProducts = state.products.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.type.toLowerCase().includes(state.searchQuery.toLowerCase());

        const matchesPrice =
          product.price >= state.priceRange[0] && product.price <= state.priceRange[1];

        const matchesType = !state.typeFilter || product.type === state.typeFilter;
        const matchesBrand = !state.brandFilter || product.brand === state.brandFilter;
        const matchesModel = !state.modelFilter || product.model === state.modelFilter;
        const matchesAvailability =
          state.availabilityFilter === null || (state.availabilityFilter && product.stock > 0);

        return matchesSearch && matchesPrice && matchesType && matchesBrand && matchesModel && matchesAvailability;
      });
    },
  },
});

export const {
  setProducts,
  setSearchQuery,
  setPriceRange,
  setCategoryFilter,
  setBrandFilter,
  setModelFilter,
  setAvailabilityFilter,
} = productSlice.actions;

export default productSlice.reducer;


