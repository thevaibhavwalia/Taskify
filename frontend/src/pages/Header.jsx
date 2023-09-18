import { Box, Select, MenuItem, InputLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/UserSlice";

const Header = () => {
 
  


  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Box
      height="80px"
    
      backgroundColor='#5B1E7C'
      padding="0 20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
        <Box fontSize="38px"  color="#fff" fontWeight="bold">
            <Link to="/home"  style={{color: 'white',fontStyle: 'italic',textDecoration:'none' }}>Taskify</Link>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
            {/* <img src={`${process.env.REACT_APP_SERVER_URL}/assets/${user.picturePath}`} width="45px" height="35px" style={{color:'white' ,borderRadius: '50%', objectFit: 'cover'}} alt={user.name} /> */}
            <img src={`http://localhost:5001/assets/${user.picturePath}`} width="45px" height="35px" style={{color:'white' ,borderRadius: '50%', objectFit: 'cover'}} alt={user.name} />
            <Select sx={{color:'white',boxShadow: 'none', '.MuiOutlinedInput-notchedOutline' : {border: 0}}}
            value={user.name}>
                <MenuItem value={user.name}>{user.name}</MenuItem>
                <MenuItem onClick={()=> {dispatch(setLogout()); navigate('/')}}>Logout</MenuItem>
            </Select>
        </Box>
    </Box>
  );
};
export default Header;