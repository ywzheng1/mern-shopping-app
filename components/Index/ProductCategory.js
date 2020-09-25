import { Row, Col, Card } from 'antd';

function ProductCategory() {

    const categories = ['sofas', 'chairs', 'bedroom', 'tables', 'storages']
    return(
        <Row>
            {categories.map( (category, index) => {
                return(
                    <Col key={index}>
                        <a href={`/category?category=${category}`}>
                            <Card key={category}>
                                {category}
                            </Card>
                        </a>
                    </Col>
                )
            })}
        </Row>
    )
}

export default ProductCategory;