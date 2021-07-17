import React,{useState,useEffect} from 'react'
import { Box,makeStyles,FormControl,InputBase,Button,TextareaAutosize} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';
import { getPost,updatePost,uploadFile} from '../../service/api';
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
        border:'2px solid red'
        
    },
    imagebox:{
        display:'flex',
        justifyContent:'center',
        textAlign:'center'
    },
    form:{
        display:'flex',
        flexDirection:'row',
        marginTop:10
    },
    textField:{
        flex:1,
        margin:'0 30px',
        fontSize:25
    },
    
    textarea:{
        width:'100%',
        marginTop:50,
        border:'none',
        fontSize:18,
        '&:focus-visible':{
            outline:'none'
        }
    },
    inputs:{
        display:'flex',
        flexDirection:'column'
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

const UpdateView = ({match}) => {
    const classes=useStyles();
    //const url="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
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

    useEffect(() => {
        const fetchData=async()=>{
            let data=await getPost(match.params.id);
            console.log(data);
            setPost(data);
        }
        fetchData();
        
    }, [])

    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value})
    }

    const updateBlog= async()=>{
        await updatePost(match.params.id,post);
        history.push(`/details/${match.params.id}`);
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.imagebox}>
                <img src={url} alt="Error" className={classes.image}/>
            </Box>
            
            <FormControl className={classes.form}>
                <label htmlFor="fileInput">
                <AddCircle style={{cursor:'pointer',color:'lightgreen'}} fontSize='large' color='action'/>
            </label>
                
                <input type='file' 
                id='fileInput'
                style={{display:'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
                 />
                <Box className={classes.inputs}>
                <InputBase onChange={(e)=>handleChange(e)} value={post.title} name="title" placeholder="Title" className={classes.textField}/>
                <InputBase onChange={(e)=>handleChange(e)} value={post.categories} name="categories" placeholder="Category" className={classes.textField}/>
                </Box>

                <Box className={classes.button}>
                <Button onClick={()=>updateBlog()} variant="contained" color="primary">Update</Button>
                </Box>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                value={post.description}
                onChange={(e)=>handleChange(e)}
                name='description'
            />

            

        </Box>
    )
}

export default UpdateView
