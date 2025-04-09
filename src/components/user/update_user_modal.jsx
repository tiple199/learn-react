import { Input, notification,Modal } from 'antd';
import { useEffect, useState } from 'react';
import { updateUserAPI } from '../../services/api.service';

const UpdateUserModal = (props) =>{
        const [id,setId] = useState("");
        const [fullName,setFullFame] = useState("");
        const [phone,setPhone] = useState("");
    
        const {isModalUpdateOpen,setIsModalUpdateOpen,dataUpdate, setDataUpdate,loadUser} = props;

        useEffect(()=>{
            if(dataUpdate){
                setId(dataUpdate._id)
                setFullFame(dataUpdate.fullName);
                setPhone(dataUpdate.phone);
            }
        },[dataUpdate])
        
        const handleSubmitBtn = async () =>{
            const res = await updateUserAPI(id,fullName,phone);
            if(res.data){
                notification.success({
                    message: "Update user",
                    description: "Cập nhật thành công"
                })
            }
            else{
                notification.error({
                    message: "Error update user",
                    description:JSON.stringify(res.message)
                })
            }
            resetAndCloseModal();
            await loadUser();
        }
        
        const resetAndCloseModal = () =>{
            setIsModalUpdateOpen(false);
            setFullFame("");
            setPhone("");
            setId("");
            setDataUpdate(null);
        }
    return(
        <Modal title="Update User"
                    open={isModalUpdateOpen} 
                    onOk={()=>handleSubmitBtn()} 
                    onCancel={()=>resetAndCloseModal()}
                    maskClosable={false}
                    okText={"Save"}>
                    <div style={{display: "flex",gap:"15px",flexDirection:"column"}}>
                        <div>
                            <span>Id</span>
                            <Input
                            value={id}
                            disabled
                            />
                        </div>
                        <div>
                            <span>FullName</span>
                            <Input
                            value={fullName}
                            onChange={(e) => setFullFame(e.target.value)}
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
    )
}
export default UpdateUserModal;