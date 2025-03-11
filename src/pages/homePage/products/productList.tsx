
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ProductCard } from './ProductCard';




const ProductList = () => {
  const { filteredProducts } = useSelector((state: RootState) => state.products);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
      {filteredProducts.map((product) => (
       <ProductCard key={product._id} product={product} /> 
      ))}
    </div>
  );
};

export default ProductList;

