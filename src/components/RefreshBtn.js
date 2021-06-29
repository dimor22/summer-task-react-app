function RefreshBtn(props){
    return (
        <button className="refresh-btn" onClick={() => props.update()}>Update List</button>
    )
}

export default RefreshBtn;