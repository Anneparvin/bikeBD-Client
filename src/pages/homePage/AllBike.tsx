
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSearchQuery, setPriceRange, setCategoryFilter, setBrandFilter, setModelFilter, setAvailabilityFilter } from '@/redux/features/bikeProduct/productSlice';
import ProductList from './products/productList';


const AllProducts = () => {
  const dispatch = useDispatch();
  const { searchQuery, priceRange, typeFilter, brandFilter, modelFilter, availabilityFilter } = useSelector(
    (state: RootState) => state.products
  );

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="p-2 border w-full mb-2"
      />

      {/* Price range filter */}
      <input
        type="range"
        min="0"
        max="10000"
        value={priceRange[1]}
        onChange={(e) => dispatch(setPriceRange([0, Number(e.target.value)]))}
        className="w-full"
      />
      <p>Max Price: ${priceRange[1]}</p>

      {/* Category filter */}
      <select onChange={(e) => dispatch(setCategoryFilter(e.target.value))} value={typeFilter} className="p-2 border w-full mb-2">
        <option value="">All Categories</option>
        <option value="Sports Bike">Sports Bike</option>
        <option value="Cruiser">Cruiser</option>
        <option value="Naked Bike">Naked Bike</option>
        <option value="Touring Bike">Touring Bike</option>
        <option value="Adventure Bike">Adventure Bike</option>
        <option value="Dirt Bike">Dirt Bike</option>
        <option value="Scooter">Scooter</option>
        <option value="Electric Bike">Electric Bike</option>
        <option value="Cafe Racer">Cafe Racer</option>
        <option value="Standard Bike">Standard Bike</option>
      </select>

      {/* Brand filter */}
      <select onChange={(e) => dispatch(setBrandFilter(e.target.value))} value={brandFilter} className="p-2 border w-full mb-2">
        <option value="">All Brands</option>
        <option value="Yamaha">Yamaha</option>
        <option value="Honda">Honda</option>
        <option value="Suzuki">Suzuki</option>
        <option value="Kawasaki">Kawasaki</option>
        <option value="Ducati">Ducati</option>
        <option value="BMW">BMW</option>
        <option value="KTM">KTM</option>
        <option value="Harley-Davidson">Harley-Davidson</option>
        <option value="Bajaj">Bajaj</option>
        <option value="Royal Enfield">Royal Enfield</option>
      </select>

      {/* Model filter */}
      <select onChange={(e) => dispatch(setModelFilter(e.target.value))} value={modelFilter} className="p-2 border w-full mb-2">
        <option value="">All Models</option>
        <option value="Yamaha R15 V4">Yamaha R15 V4</option>
        <option value="Honda CBR 500R">Honda CBR 500R</option>
        <option value="Suzuki GSX-R750">Suzuki GSX-R750</option>
        <option value="Kawasaki Ninja 650">Kawasaki Ninja 650</option>
        <option value="Ducati Panigale V4">Ducati Panigale V4</option>
        <option value="BMW S1000RR">BMW S1000RR</option>
        <option value="KTM Duke 390">KTM Duke 390</option>
        <option value="Harley-Davidson Iron 883">Harley-Davidson Iron 883</option>
        <option value="Bajaj Pulsar RS200">Bajaj Pulsar RS200</option>
        <option value="Royal Enfield Classic 350">Classic 350</option>
        <option value="Royal Enfield Classic 350">Panigale V4</option>
      </select>

      {/* Availability filter */}
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={availabilityFilter ?? false} onChange={() => dispatch(setAvailabilityFilter(!availabilityFilter))} />
        Show Only Available Products
      </label>

      {/* Display filtered products */}
      {/* <h2 className="text-3xl font-bold p-6 underline">All Products</h2> */}
      <h2 className="text-3xl font-bold p-6 underline">
  {availabilityFilter ? "Available Products" : "All Products"}
</h2>
      <ProductList />
      <a href="/" className="flex justify-center">
      <button 
  className="items-center mt-8 px-10 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
>
  Back to Home
</button>
      </a>

    </div>
  );
};

export default AllProducts;




