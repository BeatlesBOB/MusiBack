const express = require('express')
const router = express.Router();
const SpotifyWebAPI = require("spotify-web-api-node")


router.get('/login',(req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebAPI({
    redirectUri:"http://localhost:3000",
    clientId:process.env.SPOTIFY_CLIENT_ID,
    clientSecret:process.env.SPOTIFY_CLIENT_SECRET
  })
  spotifyApi.authorizationCodeGrant(code).then((data)=>{
    res.status(200).json({
      access_token:data.body.access_token,
      refresh_token:data.body.refresh_token
    })
  }).catch((err)=>{
    res.status(400).json({
      msg:err
    })
  })
});



  module.exports=router