import { Row, Image } from 'antd';

function ProductHeroImage() {
    return(
        <Row>
            <Image 
            height='800px'
            width='100%'
            src='https://images.unsplash.com/photo-1491926626787-62db157af940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80' 
            />
        </Row>
    )
}

export default ProductHeroImage;