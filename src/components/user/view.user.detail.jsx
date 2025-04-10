import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';
const ViewUserDetail = (props) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const {dataUserDetail,openUserDetail,setOpenUserDetail,loadUser} = props
    const onClose = () => {
      setOpenUserDetail(false);
    };

    const handleOnchangeFile = (e) =>{
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(null);
        setPreview(null);
        return;
    }

    // I've kept this example simple by using the first image instead of multiple
      const file = e.target.files[0];
      if(file) {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
      
    }

    const handleUpdateUserAvatar = async ()=>{
      const resUpload = await handleUploadFile(selectedFile,"avatar",);
      if(resUpload.data){
        // success
        const newAvatar = resUpload.data.fileUploaded;
        const resUpdateAvatar = await updateUserAvatarAPI(newAvatar,dataUserDetail._id,dataUserDetail.fullName,dataUserDetail.phone);
        if(resUpdateAvatar){
          setOpenUserDetail(false);
          setSelectedFile(null);
          setPreview(null);
          await loadUser();
          notification.success({
            message:"Upload user avtar",
            description:"Cập nhật avatar thành công"
          })
          
        }
        else{
          notification.error({
            message: "Error update avatar",
            description: JSON.stringify(resUpdateAvatar.message)

          })
        }
      }
      else{
        notification.error({
          message: "Error upload file",
          description:JSON.stringify(resUpload.message)
        })
        return;
      }
      


    }
    return (
      <>
        <Drawer width={"40vw"} title="Chi tiết User" onClose={onClose} open={openUserDetail}>
          {dataUserDetail?
            <>
            <p>{`id: ${dataUserDetail._id}`}</p>
            <p>{`Full name: ${dataUserDetail.fullName}`}</p>
            <p>{`Email: ${dataUserDetail.email}`}</p>
            <p>{`Phone: ${dataUserDetail.phone}`}</p>
            <p>Avatar: </p>
            <div style={{
              marginTop: "10px",
              height: "100px",
              width: "150px",
              border: "1px solid #ccc"
            }}>
              <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserDetail.avatar}`} alt="" />
            </div>
            <div>
              <label htmlFor="btnUpload" style={{display:'block',
                width:"fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer"
              }}>Upload Avatar</label>
              <input id='btnUpload' type="file" hidden
              onChange={(e) => handleOnchangeFile(e)}
              />
            </div>
            {preview && 
              <>
                <div style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  marginBottom:"15px"
                }}>
                  <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={preview} alt="" />
                </div>
                <Button type='primary' onClick={()=>handleUpdateUserAvatar()}>Save</Button>
              </>
              }
            </>
            :
            <>
            <p>Không có dữ liệu</p>
            </>

          }
        </Drawer>
      </>
    );
  };
  export default ViewUserDetail;