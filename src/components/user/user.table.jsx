import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update_user_modal';
import { useState } from 'react';

const UserTable = (props) =>{
  
  const {dataUser,loadUser} = props;

  const [isModalUpdateOpen,setIsModalUpdateOpen] = useState(false);
  const [dataUpdate,setDataUpdate] = useState(null)

  const columns = [
      {
        title: 'Id',
        dataIndex: '_id',
        render: (_, record) => {
          return(
            <a href="#">{record._id}</a>
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
            <DeleteOutlined style={{cursor:"pointer",color:"red"}}/>
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
      </>
  )
}
export default UserTable;

