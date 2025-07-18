import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () =>{

    const [current,setCurrent] = useState(1);
    const [pageSize,setPageSize] = useState(5);
    

    
    
    return(
        <div style={{padding: "20px"}}>
            <BookTable 
                current={current}
                pageSize={pageSize}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
            />
        </div>
    )
}
export default BookPage;