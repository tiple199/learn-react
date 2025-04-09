import { Drawer } from 'antd';
const ViewUserDetail = (props) => {
    
    const {dataUserDetail,openUserDetail,setOpenUserDetail} = props
    const onClose = () => {
      setOpenUserDetail(false);
    };
    return (
      <>
        <Drawer title="Chi tiết User" onClose={onClose} open={openUserDetail}>
          {dataUserDetail?
            <>
            <p>{`id: ${dataUserDetail._id}`}</p>
            <p>{`Full name: ${dataUserDetail.fullName}`}</p>
            <p>{`Email: ${dataUserDetail.email}`}</p>
            <p>{`Phone: ${dataUserDetail.phone}`}</p>
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