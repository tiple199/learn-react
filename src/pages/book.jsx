import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () =>{

    const [dataBook,setDataBook] = useState([]);
    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    const [total,setTotal] = useState(0);

    useEffect(()=>{
        loadBook();
    },[current,pageSize]);
    const loadBook = async() =>{
        const res = await fetchAllBookAPI(current,pageSize);
        if(res.data){
            setCurrent(+res.data.meta.current);
            setPageSize(+res.data.meta.pageSize);
            setTotal(res.data.meta.total);
            setDataBook(res.data.result);
        } 
        
    }
    
    return(
        <div style={{padding: "20px"}}>
            <BookTable 
                current={current}
                pageSize={pageSize}
                total={total}
                dataBook={dataBook}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                loadBook={loadBook}
            />
        </div>
    )
}
export default BookPage;