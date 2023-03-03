import { RiseLoader} from "react-spinners";
const Loading = ({ height }) => {
    return (
        <div style={{height: height, overflow: "visible", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <RiseLoader style={{overflow: "visible"}} color="white" size={20}/>
            <p style={{color: "white", marginTop: "30px"}}>Yükleniyor...</p>
        </div>
    );
};

export default Loading;
