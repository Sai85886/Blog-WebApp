import React,{useState,useEffect} from 'react'
import { Box,makeStyles,Typography } from '@material-ui/core';
import {Edit,Delete} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getPost,deletePost } from '../../service/api';
import { useHistory } from 'react-router';

const useStyles=makeStyles((theme)=>({
    container:{
        padding:'0 150px',
        [theme.breakpoints.down('md')]:{
            padding:0
        }
    },
    image:{
        
        width:'60%',
        height:'55vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        border:'2px solid blue'

    },
    imagebox:{
        display:'flex',
        justifyContent:'center',
        textAlign:'center'
    },
    
    icons:{
        float:'right'
    },
    icon:{
        margin:5,
        border:'1px solid #878787',
        padding:5,
        borderRadius:10
    },
    heading:{
        fontSize:38,
        fontWeight:600,
        textAlign:'center',
        margin:'50px 0 10px 0'
    },
    subheading:{
        color:'#878787',
        display:'flex',
        margin:'20px 0',
        [theme.breakpoints.down('sm')]:{
            display:'block'
        }
    },
    miniheading:{
        display:'flex',
        flexDirection:'column'
    },
    link:{
        textDecoration:'none',
        color:'inherit'
    }
}))

const Detailview = ({match}) => {
    const classes=useStyles();
    const url="https://content-writing-india.com/blog/wp-content/uploads/2018/03/1080px.jpg"
    const history=useHistory();
    const [post,setPost]=useState({});

    useEffect(() => {
        const fetchData=async()=>{
            let data=await getPost(match.params.id);
            console.log(data);
            setPost(data);
        }
        fetchData();
        
    }, [])
    
    const deleteBlog=async()=>{
        await deletePost(post._id);
        history.push('/');
    }
    return (
        <Box className={classes.container}>

                <Box className={classes.imagebox}>
                    <img src={post.picture||url} alt="Error"  className={classes.image}/>
                </Box>
                
            
            <Box className={classes.icons}>
                <Link to={`/update/${post._id}`}>
                <IconButton>
                    <Edit className={classes.icon} color='primary'/>
                </IconButton>
                    
                </Link>
                <IconButton>
                    <Delete onClick={()=>deleteBlog()} className={classes.icon} color='error'/>
                </IconButton>
                
            </Box>
            <Typography className={classes.heading}>{post.title}</Typography>

            <Box className={classes.subheading}>

            <Box className={classes.miniheading}>
            <Link to={`/?username=${post.username}`} className={classes.link}>
                <Typography>Author:<span style={{fontWeight:600}}>{post.username}</span></Typography>
            </Link>
            
            <Typography>Category:<span style={{fontWeight:500}}>{post.categories}</span></Typography>
            </Box>
                
                <Typography style={{marginLeft:'auto'}}>{new Date(post.createDate).toDateString()}</Typography>
            </Box>

            <Typography>{post.description}</Typography>
        </Box>
    )
}

export default Detailview
