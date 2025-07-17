import { Input, notification,Modal, InputNumber, Select } from 'antd';
import { useEffect, useState } from 'react';
import { handleUploadFile, updateBookAPI, updateUserAPI } from '../../services/api.service';

const UpdateBookModal = (props) =>{
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [mainText,setMainText] = useState("");
        const [author,setAuthor] = useState("");
        const [price,setPrice] = useState("");
        const [quantity,setQuantity] = useState("");
        const [category,setCategory] = useState("");
        const [id,setId] = useState("");
    
        const {isModalUpdateOpen,setIsModalUpdateOpen,dataUpdate, setDataUpdate,loadBook} = props;

        useEffect(()=>{
            
            if(dataUpdate){
                setId(dataUpdate._id);
                setMainText(dataUpdate.mainText);
                setAuthor(dataUpdate.author);
                setPrice(dataUpdate.price);
                setQuantity(dataUpdate.quantity);
                setCategory(dataUpdate.category);
            }
        },[dataUpdate])
        
        const handleSubmitBtn = async () =>{
            let thumbnail = selectedFile;
            if(thumbnail){
                const resUpload = await handleUploadFile(selectedFile,"book");
                thumbnail = resUpload.data.fileUploaded;
            }
            else{
                thumbnail = dataUpdate.thumbnail;
            }
            const res = await updateBookAPI(id,thumbnail,mainText,author,price,quantity,category);
            
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
            await loadBook();
        }
        
        const resetAndCloseModal = () =>{
            setId("");
            setDataUpdate("");
            setIsModalUpdateOpen(false);
            setSelectedFile(null);
            setPreview(null);
            setMainText("");
            setAuthor("");
            setPrice("");
            setQuantity("");
            setCategory("");
        }


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
    return(
       <Modal
        title="Update Book"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalUpdateOpen}
        onOk={handleSubmitBtn}
        onCancel={resetAndCloseModal}
        okText={"Update Book"}
      >
        <div>
            <span>Id</span>
            <Input
            value={id}
            disabled
            />
        </div>
        <div>
            <span>Tiêu đề</span>
            <Input
            value={mainText}
            onChange={(e)=>{setMainText(e.target.value)}}
            />
        </div>
        <div>
            <span>Tác giả</span>
            <Input
            value={author}
            onChange={(e)=>{setAuthor(e.target.value)}}
            />
        </div>
        <div>
            <span>Giá tiền</span>
            <InputNumber  addonAfter="đ"
            value={price}
            onChange={(e)=>{setPrice(e)}}
            />
            
        </div>
        <div>
            <span>Số lượng</span>
            <InputNumber style={{width:"100%"}} 
            value={quantity}
            onChange={(e)=>{setQuantity(e)}}
            />
        </div>
        <div>
            <span>Thể loại</span>
            <Select
                // defaultValue="Arts"
                style={{ width: "100%" }}
                onChange={(e)=>{setCategory(e)}}
                value={category}
                options={[
                    { value: 'Arts', label: 'Arts' },
                    { value: 'Business', label: 'Business' },
                    { value: 'Comics', label: 'Comics' },

                    { value: 'Cooking', label: 'Cooking' },
                    { value: 'Entertainment', label: 'Entertainment' },
                    { value: 'History', label: 'History' },

                    { value: 'Music', label: 'Music' },
                    { value: 'Sports', label: 'Sports' },
                    { value: 'Teen', label: 'Teen' },
                    { value: 'Travel', label: 'Travel' },

                ]}
            />
            
            
        </div>

        <div>
            <span>Ảnh thumbnail</span>
            <label htmlFor="btnUpload" style={{display:'block',
                width:"fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer"
              }}>Upload</label>
            <div>
                <input id='btnUpload' type="file" hidden
              onChange={(e) => handleOnchangeFile(e)}
                onClick={(event)=> { 
               event.target.value = null
                }}
              />
            </div>
            
        </div>
        {preview ?
              <>
                <div style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  marginBottom:"15px"
                }}>
                  <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={preview} alt="" />
                </div>
              </>
            :  
            <>
                <div style={{
                  marginTop: "10px",
                  height: "100px",
                  width: "150px",
                  marginBottom:"15px"
                }}>
                  <img style={{height:"100%",width:"100%",objectFit:"contain"}} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`} alt="" />
                </div>
              </>
            }
      </Modal>
    )
}
export default UpdateBookModal;