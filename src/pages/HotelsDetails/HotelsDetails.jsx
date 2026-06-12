import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Image, Row, Space, Tag, Typography, Rate } from 'antd';

import { fetchHotelsById } from '../../store/thunks/hotelsThunk.js';
import { clearCurrentHotel } from '../../store/slices/hotelSlice.js';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import hotel1 from '../../assets/img/hotel1.jpg';
import hotel2 from '../../assets/img/hotel2.jpg';
import hotel3 from '../../assets/img/hotel3.jpg';
import hotel4 from '../../assets/img/hotel4.jpg';
import hotel5 from '../../assets/img/hotel5.jpg';
import hotel6 from '../../assets/img/hotel6.jpg';
import hotel7 from '../../assets/img/hotel7.jpg';
import hotel8 from '../../assets/img/hotel8.jpg';
import hotel9 from '../../assets/img/hotel9.jpg';
import hotel10 from '../../assets/img/hotel10.jpg';
import hotel11 from '../../assets/img/hotel11.jpg';

const { Title, Paragraph, Text } = Typography;

const hotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7, hotel8, hotel9, hotel10, hotel11];

export default function HotelsDetails(  ) {


    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentHotel, currentHotelLoading, currentHotelError } = useSelector(
        (state) => state.hotels
    );
    useEffect(() => {
        dispatch(fetchHotelsById( id ));
        return () => {
            dispatch(clearCurrentHotel());
        };
    }, [dispatch, id]);
    if (currentHotelLoading) {
        return <Loader />;
    }
    if (currentHotelError) {
        return <ErrorMessage message={currentHotelError} />;
    }
    if (!currentHotel) {
        return null;
    }
    const imageIndex = currentHotel.id ? (currentHotel.id % hotelImages.length) : 0;
    const localHotelImage = hotelImages[imageIndex];

    return (
        <Card>
            <Row gutter={[32, 32]}>
                <Col xs={24} md={8}>
                    <Image
                        src={ localHotelImage }
                        alt={currentHotel.name}
                        style={{
                            objectFit: 'cover',
                            borderRadius: 8
                        }}
                    />
                </Col>

                <Col xs={24} md={16}>
                    <Space orientation="vertical" size="middle">
                        <Title level={2}>{currentHotel.name}</Title>

                        <Space wrap>
                            <Tag>{currentHotel.destination || "Hotel"}</Tag>
                            <Tag>{currentHotel.city}</Tag>
                        </Space>

                        <div>
                            <Rate disabled allowHalf value={currentHotel?.hotel_rating } />
                            <Text style={{ marginLeft: 12 }}>{currentHotel?.hotel_rating} / 5</Text>
                        </div>

                        <Paragraph>{currentHotel.description}</Paragraph>

                        <Button type="primary" onClick={() => navigate('/hotels')}>
                            Back to hotels
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Card>
    );
}