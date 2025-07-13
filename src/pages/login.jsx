import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () =>{
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const onFinish = async (values) =>{
        setLoading(true);
        const res = await loginAPI(values.email,values.password);
        if(res.data){
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token",res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        }
        else{
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    }
    return(
        <Row style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
            <Col xs={24} md={16} lg={8}
            >
                <fieldset style={{borderRadius:"10px",padding:"15px",margin:"5px"}}>
                    <legend style={{marginLeft:"20px"}}>Đăng Nhập</legend>
                    <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical" style={{padding:"15px"}}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' },
                                {type:"email",message:"Email không đúng định dạng!"}
                            ]}
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                            <Input.Password onKeyDown={(e) => {
                                if (e.key === "Enter") form.submit();
                            }}/>
                        </Form.Item>

                        
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <Button loading={loading} onClick={()=>form.submit()} type="primary">Login</Button>
                            <Link to={"/"}>Go to homepage <ArrowRightOutlined/></Link>
                        </div>

                        <Divider />
                    </Form>
                    
                    <div style={{marginBottom:"15px",display:"flex",justifyContent:"center"}}>Chưa có tài khoản? <Link to={"/register"}> Đăng ký tại đây</Link></div>
                </fieldset>
            </Col>
        </Row>
    )
}
export default LoginPage;