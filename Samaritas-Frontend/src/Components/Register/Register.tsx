import React from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Card } from 'antd';
import './Register.css'
import appLogo from '../../assets/Samaritas-logo.png'


type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


function Register() {
    return (
        <div className='card-container'>
            <Card bordered={false} className='card'>
            <img src={appLogo} alt="Refugee" style={{ maxWidth: '250px', height: 'auto', marginLeft: "-35px" , marginBottom: '10px' }} />
                <h1 className='regh1Style'><b>Refugee Register</b></h1>
                <Form
                    name="basic"
                    layout="vertical" // Changes layout to vertical to center fields
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!'}]}
                    >
                        <Input placeholder="Enter your Name" style={{ height: "40px", width: "300px" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input placeholder="Enter your Email" style={{ height: "40px", width: "300px" }} />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" style={{ height: "40px", width: "300px" }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ height: "35px", backgroundColor: "#3C2D79", width: "300px" }}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <a style={{color:'#DF7A00'}} href='/'>Already have an account? Login</a>
            </Card>
        </div>
    )
}

export default Register