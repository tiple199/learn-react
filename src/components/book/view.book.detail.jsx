import { Drawer } from "antd"

const ViewBookDetail = (props) => {
    const {openBookDetail,dataBookDetail,setOpenBookDetail,setDataBookDetail} = props;
    const onClose = () => {
        setOpenBookDetail(false);
        setDataBookDetail("");
    }
    return(
        <>
            <Drawer width={"40vw"}
            title="Chi tiết Sách"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={onClose}
            open={openBookDetail}
          >
            
            {dataBookDetail?
                <div style={{display:"flex",flexDirection:"column", gap:"15px"}}>
                    <p>{`id: ${dataBookDetail._id}`}</p>
                    <p>{`Tiêu đề: ${dataBookDetail.mainText}`}</p>
                    <p>{`Tác giả: ${dataBookDetail.author}`}</p>
                    <p>{`Thể loại: ${dataBookDetail.category}`}</p>
                    <p>{`Giá tiền: ${new Intl.NumberFormat('vi-VN').format(dataBookDetail.price)} đ`}</p>
                    <p>{`Số lượng: ${dataBookDetail.quantity}`}</p>
                    <p>{`Đã bán: ${dataBookDetail.sold}`}</p>
                    <p>{`Thumnail:`}</p>
                    <div style={{
                        height: "100px",
                        width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{objectFit:"contain",width:"100%",height:"100%"}} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookDetail.thumbnail}`} alt="" />
                    </div>
                    
                </div>
            :
                <p>Không có dữ liệu</p>
            }
            
          </Drawer>
        </>
    )
}
export default ViewBookDetail