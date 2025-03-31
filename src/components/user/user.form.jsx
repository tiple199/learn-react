import { Button, Input, notification } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = () => {
    const [fullName,setFullFame] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");

    const handleClickBtn = async () =>{
        const res = await createUserAPI(fullName,email,password,phone);
        if(res.data){
            notification.success({
                message: "Create user",
                description: "Tạo user thành công"
            })
        }
        else{
            notification.error({
                message: "Error create user",
                description:JSON.stringify(res.message)
            })
        }
    }   
    return(
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{display: "flex",gap:"10px",flexDirection:"column"}}>
                <div>
                    <span>FullName</span>
                    <Input
                    value={fullName}
                    onChange={(e) => setFullFame(e.target.value)}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <span>Phone Number</span>
                    <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <Button onClick={handleClickBtn} type='primary'> Create User </Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;