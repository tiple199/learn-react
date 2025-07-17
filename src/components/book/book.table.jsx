import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import ViewBookDetail from "./view.book.detail";
// import BookForm from "./book.form.controll";
import BookFormUncontroll from "./book.form.uncontroll";
// import UpdateBookModal from "./update_book_modal";
import UpdateBookModalUncontroll from "./update_book_modal.uncontroll";
import { deleteBookAPI } from "../../services/api.service";


const BookTable = (props) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {current,pageSize,total,dataBook,setCurrent,setPageSize,loadBook} = props;
  const [openBookDetail, setOpenBookDetail] = useState(false);
  const [dataBookDetail, setDataBookDetail] = useState("");
  const [isModalUpdateOpen,setIsModalUpdateOpen] = useState(false);
  const [dataUpdate,setDataUpdate] = useState("");

  const handleDeleteUser = async (id) =>{
    const res = await deleteBookAPI(id);
    if(res.data){
        notification.success({
            message: "Delete Book",
            description: "Xóa thành công"
        })
    }
    else{
        notification.error({
            message: "Error delete book",
            description:JSON.stringify(res.message)
        })
    }
    await loadBook();
  }
const columns = [
  {
    title: 'STT',
    render(_,record,index){
        return (
            <>{(index + 1) + (current - 1)*pageSize}</>
        )
    }
  },
  {
    title: 'Id',
    dataIndex: '_id',
    render(_,record){
        return <a onClick={
          ()=> {
            setOpenBookDetail(true);
            setDataBookDetail(record);
          }
        } href="#">{record._id}</a>
    }
  },
  {
    title: 'Tiêu đề',
    dataIndex: 'mainText',
  },
  {
    title: 'Giá tiền',
    dataIndex: 'price',
    render(_,record){
        return new Intl.NumberFormat('vi-VN').format(record.price) + ' đ'; 
    }
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
  },
  {
    title: 'Tác giả',
    dataIndex: 'author',
  },
  {
    title: 'Action',
    key: "action",
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

  },
];

  const onChange = (pagination, filters, sorter, extra) => { 
      if(pagination && pagination.current){
        if(pagination.current != current){
          setCurrent(+pagination.current);
        }
      }
      if(pagination && pagination.pageSize){
        if(pagination.pageSize != pageSize){
          setPageSize(+pagination.pageSize);
        }
      }
      
      // setPageSize(pageSize.pageSize);
    };


    return (
        <>
          <div style={{display:"Flex",justifyContent:"space-between",padding:"15px 0"}}>
                    <h3>Table Books</h3>
                    <Button type='primary' onClick={()=>{setIsModalOpen(true)}}> Create Book </Button>
                </div>
          <Table dataSource={dataBook} columns={columns} rowKey={"_id"}
          pagination={
          {
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) },
          
          } }
          onChange={onChange}
          />
          {/* <BookForm 
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loadBook={loadBook}
          /> */}
          <BookFormUncontroll
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            loadBook={loadBook}
          />
          <ViewBookDetail 
          dataBookDetail={dataBookDetail}
          setDataBookDetail={setDataBookDetail}
          openBookDetail={openBookDetail}
          setOpenBookDetail={setOpenBookDetail}

          />
          {/* <UpdateBookModal
          isModalUpdateOpen={isModalUpdateOpen}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          loadBook={loadBook}

          /> */}
          <UpdateBookModalUncontroll 
          isModalUpdateOpen={isModalUpdateOpen}
          setIsModalUpdateOpen={setIsModalUpdateOpen}
          dataUpdate={dataUpdate}
          setDataUpdate={setDataUpdate}
          loadBook={loadBook}
          />
        </>
    )
}
export default BookTable;