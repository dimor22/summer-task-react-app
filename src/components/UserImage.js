import shaila from "../images/sha.jpeg";
import amaira from "../images/sofia.jpeg";


function UserImage(props){
    if (props.user == 'shaila'){
        return <img src={shaila} alt="Shaila's Image"/>
    }
    if (props.user == 'amaira'){
        return <img src={amaira} alt="Amaira's Image"/>
    }
}

export default UserImage;