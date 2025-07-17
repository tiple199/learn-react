import { Input, notification,Modal, InputNumber, Select, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { handleUploadFile, updateBookAPI, updateUserAPI } from '../../services/api.service';

const UpdateBookModalUncontroll = (props) =>{
        const [form] = Form.useForm();
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        
    
        const {isModalUpdateOpen,setIsModalUpdateOpen,dataUpdate, setDataUpdate,loadBook} = props;

        useEffect(()=>{
            form.setFieldsValue({ 
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            })

        },[dataUpdate])
        
        const handleSubmitBtn = async (values) =>{
            const {id,mainText,author,price,quantity,category} = values;
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
            setDataUpdate("");
            setIsModalUpdateOpen(false);
            setSelectedFile(null);
            setPreview(null);
            
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
        onOk={()=>form.submit()}
        onCancel={resetAndCloseModal}
        okText={"Update Book"}
      >
        <Form
        form={form}
        onFinish={handleSubmitBtn}
        layout='vertical'
        >
            <Form.Item
             label="Id"
             name="id"
             
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
             label="Tiêu đề"
             name="mainText"
             rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
             label="Tác giả"
             name="author"
             rules={[{required: true, message:"Bạn cần nhập thể loại!"}]}
            >
              <Input />
            </Form.Item>

            <Form.Item
             label="Giá tiền"
             name="price"
             rules={[{required: true, message:"Bạn cần nhập thể loại!"}]}
            >
              <InputNumber  addonAfter="đ" style={{width:"100%"}}/>
            </Form.Item>

            <Form.Item
             label="Số lượng"
             name="quantity"
             rules={[{required: true, message:"Bạn cần nhập thể loại!"}]}
            >
              <InputNumber style={{width:"100%"}} />
            </Form.Item>

            <Form.Item
             label="Thể loại"
             name="category"
             rules={[{required: true, message:"Bạn cần nhập thể loại!"}]}
            >
              <Select
                // defaultValue="Arts"
                style={{ width: "100%" }}
                // onChange={(e)=>{setCategory(e)}}
                // value={category}
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
                <input id='btnUpload' type="file" hidden style={{display:"none"}}
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
            

        </Form>

      </Modal>
    )
}
export default UpdateBookModalUncontroll;