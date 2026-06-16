import { Button, Card, Rate, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import hotel1 from '../../../assets/img/hotel1.jpg';
import hotel2 from '../../../assets/img/hotel2.jpg';
import hotel3 from '../../../assets/img/hotel3.jpg';
import hotel4 from '../../../assets/img/hotel4.jpg';
import hotel5 from '../../../assets/img/hotel5.jpg';
import hotel6 from '../../../assets/img/hotel6.jpg';
import hotel7 from '../../../assets/img/hotel7.jpg';
import hotel8 from '../../../assets/img/hotel8.jpg';
import hotel9 from '../../../assets/img/hotel9.jpg';
import hotel10 from '../../../assets/img/hotel10.jpg';
import hotel11 from '../../../assets/img/hotel11.jpg';

const {Text} = Typography;

const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11];
export default function HotelsCard({hotel}) {
    const imageIndex = hotel.id ? (hotel.id % hotelImages.length) : 0;
    const localHotelImage = hotelImages[imageIndex];
    return (
        <Card
            hoverable
            cover={
                <img
                    src={localHotelImage}
                    alt={hotel.name}
                    style={{
                        height: 220,
                        objectFit: 'cover',
                    }}
                />
            }
        >
            <Space orientation='vertical' size='small' style={{width: '100%'}}>
                <Text strong style={{fontSize: '16px', display: 'block'}}>
                    {hotel.name}
                </Text>
                <Text type='secondary'>
                    {hotel.address}, {hotel.city}
                </Text>
                <Text>Tel: {hotel.phone_number || 'Not specified'}</Text>
                <Rate disabled value={hotel?.hotel_rating}/>
                <Text>Rating: {hotel?.hotel_rating} / 5</Text>
                <Link to={`/hotels/${hotel.id}`}>
                    <Button type='primary' block>Details
                    </Button>
                </Link>
            </Space>
        </Card>
    );
};