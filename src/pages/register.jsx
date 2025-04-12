import { Button, Form, Input } from "antd";

const RegisterPage = () =>{
    const [form] = Form.useForm();
    const onFinish = (value)=>{
        console.log(value);
        
    }
    return(
        <Form
        form={form}
        layout="vertical"
    
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
    
        <div style={{
            // display: "flex",
            // flexDirection:"column",
            margin:"50px"}}>
            <Form.Item
            label="Full Name"
            name="fullName"
    //       rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Email"
            name="email"
    //       rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Password"
            name="password"
    //       rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            label="Phone Number"
            name="phone"
    //       rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input />
            </Form.Item>



            <div>
                <Button onClick={()=>form.submit()} type="primary">Register</Button>
            </div>
        </div>
    
    </Form>
    )
}
export default RegisterPage;