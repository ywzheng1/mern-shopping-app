import axios from 'axios'
import ProductList from '../components/Index/ProductList';
import HeroImage from '../components/Shared/HeroImage';
import baseUrl from '../utils/baseUrl';

const imageUrls = {
  sofas: 'https://images.unsplash.com/photo-1491926626787-62db157af940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  chairs: 'https://images.unsplash.com/photo-1599619339570-40c0d33ea93b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2552&q=80',
  bedroom: 'https://images.unsplash.com/photo-1571508602588-8fee05180aae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  tables: 'https://images.unsplash.com/photo-1567156444932-b578b7a1afe4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
  storages: 'https://images.unsplash.com/photo-1595514535310-e4e66107c31d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2546&q=80'
}

function Category({ products, category }) {
    console.log(products);
    console.log(category);
  return (
    <>
      <HeroImage 
        mediaUrl={imageUrls[category]}
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
