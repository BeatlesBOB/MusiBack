const { default: axios } = require('axios');
const express = require('express')
const router = express.Router();




router.get('/track_album',(req, res)=> {
    const access_token = req.body.access_token;
    const config = {
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${access_token}`
        }
      }
    axios.get('https://api.spotify.com/v1/search?q=beatles&type=album&market=FR',config).then((data)=>{
      res.status(200).json(data)
      console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:err})
    })
});


module.exports=router