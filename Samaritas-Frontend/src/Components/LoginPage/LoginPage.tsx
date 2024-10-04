import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin, Card } from 'antd';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import appLogo from '../../assets/Samaritas-logo.png';
import axios from 'axios';
//import jwtDecode from 'jwt-decode';

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

function LoginPage() {
    const [error, setError] = useState('');
    const [openRefugee, setOpenRefugee] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Submitted Values:', values);
        setLoading(true); // Start loading when the API call begins
        let obj = {
            email: values.email,
            password: values.password,
        };
        console.log(obj, '35');

        axios
          //  .post('https://newamericans-demo-h3a4aqbsh6asemcp.eastus2-01.azurewebsites.net/users/Login', obj)
          .post('http:localhost:3002/users/Login', obj) 
          .then((response: any) => {
                if (
                    response.data.statusCode === 200 &&
                    (response.data.token !== null || response.data.token !== undefined)
                ) {
                    // const decodedToken: any = jwtDecode(response.data.accessToken);
                    // console.log(decodedToken.role, '36');

                    if (response.data) {
                        localStorage.setItem('authToken', JSON.stringify(response.data.accessToken));
                        setOpenRefugee(true);
                        // Stop loading and navigate to the home page on successful login
                        setLoading(false);
                        navigate('/home/refugee-list');
                    } else {
                        setError('Invalid email or password');
                        setLoading(false); // Stop loading if login fails
                    }
                }
            })
            .catch((error: any) => {
                console.log('Login Failed', 'An error occurred. Please try again.', error);
                setError('Login Failed. Please try again.');
                setLoading(false); // Stop loading if an error occurs
            });
    };

    // Handle form submission failure
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Form Submission Failed:', errorInfo);
    };

    return (
        <div className='card-container'>
            <Card bordered={false} className='card'>
                <img
                    src={appLogo}
                    alt="Refugee"
                    style={{ maxWidth: '250px', height: 'auto', marginLeft: '-35px', marginBottom: '10px' }}
                />
                <h1 className='loginh1Style'>
                    <b>Login</b>
                </h1>

                {/* Display loader when loading */}
                <Spin spinning={loading}>
                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input placeholder="Enter your Email" style={{ height: '40px', width: '300px' }} />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" style={{ height: '40px', width: '300px' }} />
                        </Form.Item>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{ height: '35px', backgroundColor: '#3C2D79', width: '300px' }}
                                disabled={loading} // Disable button while loading
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>

                <a style={{ color: '#DF7A00' }} href='/register'>
                    Don't have an account? Register
                </a>
            </Card>
        </div>
    );
}

export default LoginPage;