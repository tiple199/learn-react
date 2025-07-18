import { Button, Form, Input, InputNumber, Modal, notification, Select } from "antd"
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const BookFormUncontroll = (props) => {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview,setPreview] = useState(null);
    const [loadingCreate,setLoadingCreate] = useState(false);
    

    const {isModalOpen, setIsModalOpen, loadBook} = props;

    const delay = (miliSecound) =>{
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve()
      },miliSecound)
    });
  }

    const handleSubmitBtn = async (values) => {
        setLoadingCreate(true);
        const { mainText, author, price, quantity, category} = values;
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
        await delay(1000);
        setLoadingCreate(false);
        
    }


    const resetAndCloseModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);

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
        onOk={()=>{form.submit()}}
        onCancel={resetAndCloseModal}
        okButtonProps={{
          loading:loadingCreate
        }}
        okText={"Create"}
      >
       <Form
        form={form}
        onFinish={handleSubmitBtn}
        layout="vertical"
        >
           <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
            >
              <Input style={{width:"100%",display:"block"}}/>
            </Form.Item>
           <Form.Item
            label="Tác giả"
            name="author"
            rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
            >
              <Input />
            </Form.Item>
           <Form.Item
            label="Giá tiền"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
            >
              <InputNumber  addonAfter="đ" style={{width:"100%"}}/>
            </Form.Item>
           <Form.Item
            label="Số lượng"
            name="quantity"
            
            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <InputNumber style={{width:"100%"}}/>
            </Form.Item>
           <Form.Item
            label="Thể loại"
            name="category"
            rules={[{ required: true, message: 'Vui lòng nhập thể loại!' }]}
            >
              <Select
                // defaultValue="Arts"
                style={{ width: "100%" }}
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
            </Form.Item>
           


        </Form>
 

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
export default BookFormUncontroll