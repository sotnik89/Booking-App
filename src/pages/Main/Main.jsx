import {Link} from 'react-router-dom';
import {Button, Card, Space, Typography} from 'antd';

const {Title, Paragraph} = Typography;

export default function Main() {
    return (
        <Card>
            <Space orientation='vertical' size='middle'>
                <Title>HOTELS</Title>
                <Paragraph>
                    Hotel Finder is a React application for searching, filtering, sorting and viewing hotel
                    details.
                </Paragraph>
                <Paragraph>
                    The project uses React, Redux Toolkit, redux-thunk, React Router, Axios, Ant Design and
                    environment variables.
                </Paragraph>
                <Link to='/hotels'>
                    <Button type='primary' size='large'>
                        Find hotel
                    </Button>
                </Link>
            </Space>
        </Card>
    );
};