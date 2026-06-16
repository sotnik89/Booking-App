import { Spin } from 'antd';

export default function Loader() {
    return (
        <div style={{textAlign: 'center', padding: '40px 0'}}>
            <Spin size='large'/>
        </div>
    );
};