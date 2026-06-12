import { Alert } from 'antd';

export default function ErrorMessage({ message }) {
    return <Alert type="error" title="Error" description={message} showIcon />;
}