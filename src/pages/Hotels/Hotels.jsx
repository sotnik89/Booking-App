import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Typography, Space} from 'antd';

import {fetchHotels} from '../../store/thunks/hotelsThunk.js';
import {fetchDestinations} from '../../store/thunks/destinationsThunk.js';

import useDebounce from '../../hooks/useDebounce.js';

import Loader from '../../components/Loader/Loader.jsx';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import HotelsFilter from './components/HotelsFilter.jsx';
import HotelsSort from './components/HotelsSort.jsx';
import HotelsList from './components/HotelsList.jsx';

const {Title, Paragraph} = Typography;

export default function Hotels() {
    const dispatch = useDispatch();
    const {hotels, loading, error, filters} = useSelector(state => state.hotels);
    const {destinations, loading: destinationsLoading} = useSelector(state => state.destinations);
    const debouncedSearch = useDebounce(filters.search, 1000);
    const requestFilters = useMemo(() => {
        return {
            search: debouncedSearch,
            city: filters.city,
            rating: filters.rating,
            sortBy: filters.sortBy,
            order: filters.order
        };

    }, [debouncedSearch, filters.city, filters.rating, filters.sortBy, filters.order]);
    useEffect(() => {
        dispatch(fetchHotels(requestFilters));
    }, [requestFilters, dispatch]);
    useEffect(() => {
        dispatch(fetchDestinations());
    }, [dispatch]);
    return (
        <Space orientation='vertical' size='large' style={{width: '100%'}}>
            <Title level={2}>Hotels</Title>
            <Paragraph>
                Search, filter and sort hotels from the catalog.
            </Paragraph>
            <HotelsFilter
                destinations={destinations}
                destinationsLoading={destinationsLoading}
            />
            <HotelsSort/>
            {loading && <Loader/>}
            {error && <ErrorMessage message={error}/>}
            {!loading && !error && <HotelsList hotels={hotels}/>}
        </Space>
    );
};