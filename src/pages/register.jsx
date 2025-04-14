import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { registerUserAPI } from "../services/api.service";
import {  Link, useNavigate } from "react-router-dom";

const RegisterPage = () =>{
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values)=>{
        const res = await registerUserAPI(values.fullName,values.email,values.password,values.phone);
        if(res.data){
            notification.success({
                message:"Register user",
                description:"Đăng ký tài khoản thành công!"
            });
            navigate("/login");
        }
        else{
            notification.error({
                message:"Error create user",
                description:JSON.stringify(res.message)
            })
        }
        
        
    }
    return(
        <>
        <h1 style={{marginTop:"15px",display:"flex",justifyContent:"center"}}>Đăng ký tài khoản</h1>
        <Form
        form={form}
        layout="vertical"
        style={{margin: "30px"}}
        
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
        <Row justify={'center'}>
            <Col xs={24} md={8}>
                <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input />
                </Form.Item>
            </Col>
        </Row>
        <Row justify={'center'}>
            <Col xs={24} md={8}>
                <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input />
                </Form.Item>
            </Col>
        </Row>
        <Row justify={'center'}>
            <Col xs={24} md={8}>
                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
                </Form.Item>
            </Col>
        </Row>
        <Row justify={'center'}>
            <Col xs={24} md={8}>
                <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{
                required:true,
                pattern: new RegExp(/\d+/g),
                message: "Wrong format!"
              }]}
            >
            <Input />
                </Form.Item>
            </Col>
        </Row>
        <Row justify={'center'}>
            <Col xs={24} md={8}>
            <div>
                <Button onClick={()=>form.submit()} type="primary">Register</Button>
            </div>
            <Divider />
            <div style={{display:"flex",justifyContent:"center"}}>Chưa có tài khoản? <Link to={"/login"}> Đăng nhâp tại đây</Link></div>
            </Col>
        </Row>
        
        </Form>
        
    </>
    )
}
export default RegisterPage;