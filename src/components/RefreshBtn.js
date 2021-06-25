function RefreshBtn(){
    return (
        <button className="refresh-btn" onClick={() => window.location.reload()}>Refresh List</button>
    )
}

export default RefreshBtn;