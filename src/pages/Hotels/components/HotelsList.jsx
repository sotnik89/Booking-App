import { Empty, Row, Col } from 'antd';

import HotelsCard from './HotelsCard.jsx';

export default function HotelsList({hotels}) {
    if (!hotels?.length) {
        return <Empty description='Hotels not found'/>;
    }
    return (
        <Row gutter={[16, 16]}>
            {hotels.map((hotel) => (
                <Col key={hotel.id} xs={24} sm={12} md={8} lg={6}>
                    <HotelsCard hotel={hotel}/>
                </Col>
            ))}
        </Row>
    );
};