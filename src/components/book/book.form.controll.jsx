import { Button, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [mainText,setMainText] = useState("");
    const [author,setAuthor] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [category,setCategory] = useState("");
    

    const {isModalOpen, setIsModalOpen,loadBook} = props;
    const handleOk = async () => {
        if(!preview){
            notification.error({
                message:"Create Book Error",
                description:"Bạn cần thêm ảnh cho sách!"
            })
        }
        else{
            const resUpload = await handleUploadFile(selectedFile,"book");
            if(resUpload.data){
              const newBookUpload = resUpload.data.fileUploaded;
                const resCreateBook = await createBookAPI(newBookUpload,mainText,author,price,quantity,category);
                if(resCreateBook){
                    
                    resetAndCloseModal();
                    await loadBook();
                    notification.success({
                      message:"Create Book success",
                      description:"Thêm sách thành công!"
                    })
                
                    }
                else{
                  notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resCreateBook.message)
                
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
        
    }
    const resetAndCloseModal = () => {
        setIsModalOpen(false);
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
        console.log("check file",file);
        
        setPreview(URL.createObjectURL(file));
      }
      
    }

    return(
        <Modal
        title="Create Book"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={resetAndCloseModal}
        okText={"Create"}
      >
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
              </>
              }
      </Modal>
    )
}
export default BookForm