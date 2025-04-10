import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table,Popconfirm, notification } from 'antd';
import UpdateUserModal from './update_user_modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) =>{
  
  const {dataUser,loadUser} = props;
  const [openUserDetail, setOpenUserDetail] = useState(false);
  const [isModalUpdateOpen,setIsModalUpdateOpen] = useState(false);
  const [dataUpdate,setDataUpdate] = useState(null);
  const [dataUserDetail,setDataUserDetail] = useState("");

  const handleDeleteUser = async (id) =>{
    const res = await deleteUserAPI(id);
    if(res.data){
        notification.success({
            message: "Delete user",
            description: "Xóa thành công"
        })
    }
    else{
        notification.error({
            message: "Error delete user",
            description:JSON.stringify(res.message)
        })
    }
    await loadUser();
}

  const columns = [
      {
        title: 'Id',
        dataIndex: '_id',
        render: (_, record) => {
          return(
            <a onClick={()=>{
              setOpenUserDetail(true);
              setDataUserDetail(record);
            }} href="#">{record._id}</a>
          )
        }
      },
      {
        title: 'Full Name',
        dataIndex: 'fullName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <div style={{display:"flex",gap:"20px"}}>
            <EditOutlined onClick={()=>{
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }

            } style={{cursor:"pointer",color:"orange"}}/>
            <Popconfirm
              placement="left"
              title={"Xóa người dùng"}
              description={"Bạn có chắc chắn xóa user này?"}
              onConfirm={async ()=>{handleDeleteUser(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
            <DeleteOutlined danger style={{cursor:"pointer",color:"red"}}/>
            </Popconfirm>
          </div>
        ),
      }
    ];
    
  return(
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"}/>
      <UpdateUserModal 
      isModalUpdateOpen={isModalUpdateOpen}
      setIsModalUpdateOpen={setIsModalUpdateOpen}
      dataUpdate = {dataUpdate}
      setDataUpdate={setDataUpdate}
      loadUser={loadUser}
      />
      <ViewUserDetail
      loadUser = {loadUser}
      dataUserDetail = {dataUserDetail}
      openUserDetail={openUserDetail}
      setOpenUserDetail={setOpenUserDetail}
      />
      </>
  )
}
export default UserTable;

