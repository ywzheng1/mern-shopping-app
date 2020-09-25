import axios from 'axios'
import ProductList from '../components/Index/ProductList';
import HeroImage from '../components/Shared/HeroImage';
import baseUrl from '../utils/baseUrl';
import { CATEGORY_COVERS_URL } from '../constants/images';

function Category({ products, category }) {
    console.log(products);
    console.log(category);
  return (
    <>
      <HeroImage 
        mediaUrl={CATEGORY_COVERS_URL[category]}
      />
      <ProductList products={products}/>
    </>
  );
}

Category.getInitialProps = async ({ query: { category } }) => {
    const url = `${baseUrl}/api/category`;
    const payload = { params: { category } };
    const response = await axios.get(url, payload);
    return {products: response.data, category}
}

export default Category;
