import { Row, Image } from 'antd';

function HeroImage({mediaUrl}) {
    return(
        <Row style={{ marginBottom: '2rem'}}>
            <Image 
                height='700px'
                width='100%'
                src={mediaUrl}
            />
        </Row>
    )
}

export default HeroImage;