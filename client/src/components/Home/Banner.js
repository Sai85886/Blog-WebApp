import React from 'react'
import { makeStyles,Box,Typography } from '@material-ui/core';

const useStyles=makeStyles({
    image:{
        background: `url(${'https://previews.123rf.com/images/tomstocker/tomstocker1711/tomstocker171100474/89939463-education-concept-book-and-pen-on-wood-table-and-black-background-.jpg'}) center/60% repeat-x #000`,
        width:'100%',
        height:'50vh',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        '& :first-child':{
            fontSize:45,
            color:'black',
            background:'skyblue',
            borderRadius:10,
            marginBottom:2,
            lineHeight:1

        }, 
        '& :last-child':{
            fontSize:20,
            background:'pink',
            borderRadius:8,
            color:'black'
        }
        
    }
})
const Banner = () => {
    const classes=useStyles();
    return (
        <Box className={classes.image}>
            <Typography>BST-BLOG</Typography>
            <Typography>Welcome!!</Typography>
        </Box>
    )
}

export default Banner
