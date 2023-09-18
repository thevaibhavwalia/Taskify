import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import { Container } from "@mui/system";
  import { useState, useEffect } from "react";
  import axios from "../services/api";
  import { useDispatch, useSelector } from "react-redux";
  import { setTasks } from "../redux/TaskSlice";
  import Header from "./Header";
  import { Link } from "react-router-dom";
  import Task from "../components/Task";
  import Stack from "@mui/material/Stack";
  import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/api";
  const Home = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const[del,setdel]=useState(false);
    const [typeFilter, setTypeFilter] = useState("");
    const [dayFilter, setDayFilter] = useState("");
    const types = ["default", "personal", "shopping", "wishlist", "work"];
    const days = [
      { label: "Today", value: "today" },
      { label: "Last seven", value: "seven" },
      { label: "Last Thirty", value: "thirty" },
    ];

    useEffect(() => {
      axios.get(`/task?type=${typeFilter}&day=${dayFilter}`).then((res) => {
        dispatch(setTasks(res.data.tasks));
      });
    }, [typeFilter, dayFilter,del]);
    const { tasks } = useSelector((state) => state.task);
    const pendingTasks = tasks.filter(task => task.status === 'pending');

  
    const handleTypeChange = (e) => {
      setTypeFilter(e.target.value)
    };
    return (
      <Box>
        <Header />
        <Container >
          <Box display="flex" justifyContent="space-between" mt="2rem">
            
           

            <FormControl style={{ minWidth: 200}}>
              <InputLabel sx={{fontSize:'18px',fontWeight:'bold',fontStyle:'italic'}}>Select Type</InputLabel>
              <Select value={typeFilter} onChange={handleTypeChange}>
                {types.map((type, idx) => (
                  <MenuItem key={`${idx}-${type}`} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

        
      
            <Stack direction="row" spacing={2}>
                <Button variant="contained" component={Link} to="/task/create">CREATE NEW TASK</Button>
              {days.map((day, idx) => (
                <Button
                  variant="contained"
                  size="small"
                  color={day.value === dayFilter ? "success" : "secondary"}
                  key={`${idx}-${day.value}`}
                  onClick={() => {
                    setDayFilter(day.value);
                  }}
                >
                  {day.label}
                </Button>
              ))}

            </Stack>

          </Box>
          <Box  style={{ marginLeft: '20px',marginTop:'4px' }} width="200px" display="flex" justifyContent="space-between">
               <Button width="200px" sx={{color:'#5B1E7C' ,fontStyle:'italic', marginBottom:'3px'}}variant="outlined" onClick={() => {setTypeFilter(''); setDayFilter('')}}>Clear filters</Button>
          </Box>

         <Divider/>
         
  

          <Box mt="2rem" marginRight={1}>
            <Grid container spacing={2}>
          
             
              {pendingTasks.map((task, idx) => (
               
                <Grid item   xs={12} md={3} key={`${idx}-${task.id}`}>
                    <Box >
                        
                    <DeleteIcon sx={{cursor:'pointer', fontSize:'30px',color:'red'}}
                    onClick={async()=>{
                        try{
                        const id=task._id;
                      
                         const res=await axiosInstance.delete( `/task/${id}`)
                         

                         
                         setdel(true);
                        }catch(err)
                        {
                            console.log(err);
                        }
                    }}/>
                        
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/task/${task._id}`}
                  >
                    <Task task={task} />
                  
                  </Link>
                  </Box>  
                 
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  };
  export default Home;