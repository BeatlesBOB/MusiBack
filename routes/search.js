const { default: axios } = require('axios');
const express = require('express')
const router = express.Router();




router.get('/track_album',(req, res)=> {
    const config = {
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_ID).toString('base64'))
        }
      }
    axios.get('https://api.spotify.com/v1/search?q=beatles&type=album&market=FR').then((data)=>{
      console.log(data)
    }).catch(err=>{
        console.log(err)
        res.status(400).json({msg:err})
    })
});


module.exports=router