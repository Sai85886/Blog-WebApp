import React,{useState,useEffect} from 'react'
import { Box,makeStyles,FormControl,InputBase,Button,TextareaAutosize} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import { createPost,uploadFile } from '../../service/api';
import {useHistory} from 'react-router-dom';

const useStyles=makeStyles((theme)=>({
    container:{
        padding:'0 100px',
        [theme.breakpoints.down('md')]:{
            padding:0
        }
    },
    image:{
        width:'100%',
        height:'50vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        display:'block',
        objectFit:"contain"
    },
    form:{
        display:'flex',
        flexDirection:'row',
        marginTop:10
    },
    textField:{
        flex:1,
        margin:'0 30px',
        fontSize:20,
        marginBottom:5,
        textTransform:'capitalize'
    },
    
    inputs:{
        display:'flex',
        flexDirection:'column'
    },

    textarea:{
        width:'100%',
        marginTop:30,
        border:'none',
        fontSize:18,
        '&:focus-visible':{
            outline:'none'
        }
    },

    button:{
        marginLeft:'auto',height:'30'
    }
}))

const initialValues={
    title:'',
    description:'',
    picture:'',
    username:'BST',
    categories:'ALL',
    createDate:new Date()

}

const CreateView = () => {
    const classes=useStyles();
    
    const history=useHistory();
    const [post,setPost]=useState(initialValues);
    const [file,setFile]=useState('');
    const [image,setImage]=useState('');
    const url=post.picture||"https://content-writing-india.com/blog/wp-content/uploads/2018/03/1080px.jpg";

    useEffect(() => { 
        const getImage=async()=>{
            if(file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);

                const image=await uploadFile(data);
                post.picture=image.data;
                setImage(image.data);
                
            }
        }
       getImage();
    }, [file])
    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }

    const savePost=async (e)=>{
        await createPost(post);
        history.push('/');
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="Error" className={classes.image}/>
            <FormControl className={classes.form}>
            <label htmlFor="fileInput">
                <AddCircle style={{cursor:'pointer'}} fontSize='large' color='action'/>
            </label>
                
                <input type='file' 
                id='fileInput'
                style={{display:'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
                 />
                 <Box className={classes.inputs}>
                 <InputBase onChange={(e)=>handleChange(e)} name="username" placeholder="Enter your Name" className={classes.textField}/>
                <InputBase onChange={(e)=>handleChange(e)} name="title" placeholder="Title" className={classes.textField}/>
                <InputBase onChange={(e)=>handleChange(e)} name="categories" placeholder="Category" className={classes.textField}/>
                </Box>
                <Box className={classes.button}>
                <Button onClick={(e)=>savePost(e)} variant="contained" color="primary">Publish</Button>
                </Box>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Write your blog here..."
                className={classes.textarea}
                onChange={(e)=>handleChange(e)}
                name="description"
            />

            

        </Box>
    )
}

export default CreateView
