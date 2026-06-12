import {useSelector, useDispatch} from 'react-redux';
import {Button, Card, Col, Input, InputNumber, Row, Select} from 'antd';

import {
    setSearch,
    setCity,
    setRating,
    resetFilters,
} from '../../../store/slices/hotelSlice.js';

export default function HotelsFilter({destinations = [], destinationsLoading = false}) {
    const dispatch = useDispatch();

    const {filters} = useSelector((state) => state.hotels);

    const destinationOptions = destinations.map((destination) => ({
        label: destination.label,
        value: destination.label,
    }));

    return (
        <Card title="Filters">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                    <Input
                        placeholder="Search by name"
                        value={filters.search}
                        onChange={(event) => {
                            dispatch(setSearch(event.target.value));
                        }}
                        allowClear
                    />
                </Col>

                <Col xs={24} md={6}>
                    <Select
                        placeholder="Destination"
                        value={filters.city || undefined}
                        options={destinationOptions}
                        loading={destinationsLoading}
                        onChange={(value) => {
                            dispatch(setCity(value));
                        }}
                        allowClear
                        style={{width: '100%'}}
                    />
                </Col>
                <Col xs={24} md={4}>
                    <InputNumber
                        placeholder="Rating"
                        value={filters.rating || undefined}
                        min={ 0 }
                        max={ 5 }
                        step={ 1 }
                        onChange={(value) => {
                            dispatch(setRating(value || ''));
                        }}
                        style={{width: '100%'}}
                    />
                </Col>

                <Col xs={24} md={4}>
                    <Button
                        type="default"
                        onClick={() => {
                            dispatch(resetFilters());
                        }}
                        block
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}