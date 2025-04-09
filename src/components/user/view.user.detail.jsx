import { Button, Drawer } from 'antd';
const ViewUserDetail = (props) => {
    
    const {dataUserDetail,openUserDetail,setOpenUserDetail} = props
    const onClose = () => {
      setOpenUserDetail(false);
    };
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
            <div>
              <img width={"150px"} height={"150px"} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserDetail.avatar}`} alt="" />
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
              <input id='btnUpload' type="file" hidden/>
            </div>
            {/* <Button type='primary'>Upload Avatar</Button> */}
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