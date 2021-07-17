import React from 'react'
import { Box,Typography,makeStyles} from '@material-ui/core';

const useStyles=makeStyles({
    container:{
        height:350,
        margin:10,
        borderRadius:10,
        border:'2px solid black',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        '&>*':{
            padding:'0 5 5 5'
        }
        
    },

    image:{
        height:160,
        width:'100%',
        objectFit:'cover',
        borderRadius:'10px 10px 0 0',
        marginBottom:5,
        justifyContent:'center',
        alignItems:'center'
    },

    text:{
        color:'#878787',
        fontSize:12
    },
    heading:{
        fontSize:18,
        fontWeight:600,
        textAlign:'center'
    },
    detail:{
        fontSize:14,
        wordBreak:'break-word',
        overflow:'hidden',
        textOverflow:'ellipsis'
    }
})

const Post = ({post}) => {
    const classes=useStyles();
    const url=post.picture||"https://www.wpbeginner.com/wp-content/uploads/2018/07/whatisblog.png";

    return (
        <Box className={classes.container}>
           <img src={url} alt="Error" className={classes.image}/>
           <Typography className={classes.text}>{post.categories}</Typography>
           <Typography className={classes.heading}>{post.title}</Typography>
           <Typography className={classes.text}>Author:{post.username}</Typography>
           <Typography className={classes.detail}>{post.description}</Typography>
        </Box>
    )
}

export default Post
