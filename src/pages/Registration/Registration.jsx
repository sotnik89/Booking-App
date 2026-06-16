import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Input, Button } from 'antd';

export default function Registration() {
    const handleValidate = (values) => {
        const errors = {};
        if(!values.fullName.trim()){
            errors.fullName = 'Please enter name';
        }
        if (!values.email) {
            errors.email = 'Required field';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Wrong format number(example: example@mail.com)';
        }
        if (!values.password) {
            errors.password = 'Required field';
        } else if (values.password.length < 8) {
            errors.password = 'Password should have not less than 8 symbols';
        } else if (!/(?=.*[0-9])/.test(values.password)) {
            errors.password = 'Password should have min 1 figure';
        }
        if (!values.phone) {
            errors.phone = 'Required field';
        } else if (!/^\+?3?8?(0\d{9})$/.test(values.phone)) {
            errors.phone = 'Wrong format number(example: +380991234567)';
        }
        return errors
    };
    const handleSubmit = (values) => {
        console.log('Sending data...', values)
    };
    return (
        <div style={{ maxWidth: 400, margin: '20px auto' }}>
            <h1>Registration</h1>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    phone: ''
                }}
                validate={handleValidate}
                onSubmit={handleSubmit}
            >
                {() => {
                    return (
                        <Form layout='vertical' onFinish={handleSubmit}>
                            <Form.Item
                                label='Full Name'
                            >
                                <Field name='fullName'>
                                    {({ field }) => <Input {...field} placeholder='Enter full name' />}
                                </Field>
                            </Form.Item>
                            <ErrorMessage name='fullName'>
                                {(message) => <p style={{ color: 'red' }}>{message}</p>}
                            </ErrorMessage>

                            <Form.Item
                                label='Email'
                            >
                                <Field name='email'>
                                    {({ field }) => <Input {...field} placeholder='john.doe@example.com' />}
                                </Field>
                            </Form.Item>
                            <ErrorMessage name='email'>
                                {(message) => <p style={{ color: 'red' }}>{message}</p>}
                            </ErrorMessage>

                            <Form.Item
                                label='Password'
                            >
                                <Field name='password'>
                                    {({ field }) => <Input.Password {...field} placeholder='Password' />}
                                </Field>
                            </Form.Item>
                            <ErrorMessage name='password'>
                                {(message) => <p style={{ color: 'red' }}>{message}</p>}
                            </ErrorMessage>

                            <Form.Item
                                label='Phone'
                            >
                                <Field name='phone'>
                                    {({ field }) => <Input {...field} placeholder='+380*********' />}
                                </Field>
                            </Form.Item>
                            <ErrorMessage name='phone'>
                                {(message) => <p style={{ color: 'red' }}>  {message}</p>}
                            </ErrorMessage>

                            <Button type='primary' htmlType='submit' block>
                                Submit
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
};