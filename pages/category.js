import axios from 'axios'
import ProductList from '../components/Index/ProductList';
import baseUrl from '../utils/baseUrl';

function Category({ products }) {
    // console.log(typeof(products));
    // console.log(products);
  return (
    <>
    <ProductList products={products}/>
    </>
  );
}

Category.getInitialProps = async ({ query: { category } }) => {
    const url = `${baseUrl}/api/category`;
    const payload = { params: { category } };
    const response = await axios.get(url, payload);
    return response.data
}

export default Category;
