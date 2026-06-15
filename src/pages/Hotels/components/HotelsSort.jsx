import {useDispatch, useSelector} from 'react-redux';
import {Card, Col, Row, Select} from 'antd';

import {setSortBy, setOrder} from '../../../store/slices/hotelSlice.js';

const sortByOptions = [
    {label: 'Name', value: 'name'},
    {label: 'City', value: 'city'},
    {label: 'Rating', value: 'hotel_rating'},
];

const orderOptions = [
    {label: 'Ascending', value: 'asc'},
    {label: 'Descending', value: 'desc'},
];

export default function HotelsSort() {
    const dispatch = useDispatch();
    const {filters} = useSelector((state) => state.hotels);

    return (
        <Card title='Sorting'>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Select
                        placeholder='Sort by'
                        value={filters.sortBy || undefined}
                        options={sortByOptions}
                        onChange={(value) => {
                            dispatch(setSortBy(value || undefined));
                        }}
                        allowClear
                        style={{width: '100%'}}
                    />
                </Col>

                <Col xs={24} md={12}>
                    <Select
                        value={filters.order}
                        options={orderOptions}
                        onChange={(value) => {
                            dispatch(setOrder(value || undefined));
                        }}
                        style={{width: '100%'}}
                    />
                </Col>
            </Row>
        </Card>
    );
}