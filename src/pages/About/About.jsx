import {Card, List, Typography} from 'antd';

const {Title, Paragraph} = Typography;

const technologies = [
    'React',
    'Redux Toolkit',
    'redux-thunk',
    'React Router',
    'Axios',
    'Ant Design',
    'Vite',
    'Environment variables',
    'Express backend',
];

const features = [
    'Loading hotels list from API',
    'Searching hotels by name',
    'Filtering hotels by city',
    'Filtering hotels by rating',
    'Error and loading state handling',
    'Responsive UI based on Ant Design',
];

export default function About() {
    return (
        <Card>
            <Title level={2}>Seamless Stays Everywhere: Travel Your Way with BOOKING APP</Title>
            <Paragraph>
                Welcome to BOOKING APP, your ultimate partner for effortless travel planning and unforgettable journeys.
                Our mission is to make finding your next stay simple, transparent, and affordable for every type of
                traveler. We bring together thousands of top-rated hotels, cozy apartments, and unique local homes
                worldwide onto one secure, easy-to-use platform. With real user reviews, smart search filters, and 24/7
                customer support, you can book your accommodation with complete peace of mind. Let us handle the details
                while you focus on exploring new horizons and creating lasting memories.
            </Paragraph>
            <Title level={3}>Technologies</Title>
            <List
                bordered
                dataSource={technologies}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Title level={3} style={{marginTop: 24}}>
                Main features
            </Title>
            <List bordered dataSource={features} renderItem={(item) => <List.Item>{item}</List.Item>}/>
        </Card>
    );
};