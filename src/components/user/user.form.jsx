import { Button, Flex, Input, notification,Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = (props) => {
    const {loadUser} = props;
    const [fullName,setFullFame] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");

    const [isModalOpen,setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () =>{
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
        resetAndCloseModal();
        await loadUser();
    }
    
    const resetAndCloseModal = () =>{
        setIsModalOpen(false);
        setFullFame("");
        setEmail("");
        setPassword("");
        setPhone("");
    }
    return(
        <div className="user-form" style={{ margin: "10px 0" }}>
            
                <div style={{display:"Flex",justifyContent:"space-between"}}>
                    <h3>Table Users</h3>
                    <Button onClick={()=>setIsModalOpen(true)} type='primary'> Create User </Button>
                </div>
                <Modal title="Create User"
                    open={isModalOpen} 
                    onOk={()=>handleSubmitBtn()} 
                    onCancel={()=>resetAndCloseModal()}
                    maskClosable={false}
                    okText={"Create"}>
                    <div style={{display: "flex",gap:"15px",flexDirection:"column"}}>
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
                    </div>
                </Modal>

            
        </div>
    )
}

export default UserForm;