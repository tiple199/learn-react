import { Button, Input } from 'antd';
import { useState } from 'react';
import axios  from 'axios';

const UserForm = () => {
    const [fullName,setFullFame] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhong] = useState("");

    const handleClickBtn = () =>{
        const URL_BACKEND = "http://localhost:8080/api/v1/user";
        const data = {
            fullName,
            email,
            password,
            phone
        };
        axios.post(URL_BACKEND,data);
        console.log('>>> check ', {fullName,email,password,phone});
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
                    onChange={(e) => setPhong(e.target.value)}
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