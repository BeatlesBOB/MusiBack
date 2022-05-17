const { default: axios } = require('axios');
const express = require('express')
const router = express.Router();




router.post('/login',(req, res)=> {
  const code = req.body.code;
  const data = {
    grant_type:"authorization_code",
    code:code,
    redirect_uri:process.env.REDIRECT_URI
  }
  const config = {
    headers: {
      "Authorization": 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
  }

  axios.post('https://accounts.spotify.com/api/token',data,config).then((data)=>{
    res.status(200).json({
      access_token:data.body.access_token,
      refresh_token:data.body.refresh_token,
      expires_in:data.body.expires_in
    })
  }).catch(err=>{
    res.status(400).json({msg:err})
  })
});

router.get('/refresh',(req,res)=>{
  const refresh = req.body.refresh_token;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_ID).toString('base64'))
    }
  }
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token',refresh)
  axios('https://accounts.spotify.com/api/token',params,config).then((data)=>{
    res.status(200).json({
      access_token:data.body.access_token,
      refresh_token:data.body.refresh_token,
      expires_in:data.body.expires_in
    })
  }).catch(err=>{
    res.status(400).json({msg:err})
  })
})

  module.exports=router