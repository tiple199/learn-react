import "./style.css"
const MyComponent = () => {
  // const name = "Tiệp";
  const name = [1,2,3];
  return (
    <>
      {/* trong phần style {} thứ nhất để viết code javascript trong html còn cái thứ hai để thể hiện đó là một object vì thế ví dụ như borderRadius là dạng thế kia */}
        <div className="child" style={
            {borderRadius: "10px"}
        }>Lê Nho {JSON.stringify(name)}</div>
        <div>{console.log("Hello")}</div>
        <div>Hehe</div>
    </>
  );
}

export default MyComponent;