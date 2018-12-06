var express = require('express');
var router = express.Router();

// 保存下client_redriect_url
let client_redriect_url = ''
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
  //res.send('buh')
});

router.get('/abc', function (req, res, next) {
  res.send('abc')
})

router.get('/oauth2/authorize', function (req, res, next) {
  console.log(req.query)
  res.setHeader('access-control-allow-origin', '*')
  // res.send(req.query.state)
  client_redriect_url = req.query.redriect_uri
  let websiteName = req.query.client_id
  let infoRange = req.query.scope
  let resHtml = `<div>网站${websiteName}将获得你的${infoRange}</div><div>是否同意？</div>`
  res.render('index', {
    title: websiteName,
    info: infoRange
  })
  //res.send('http://localhost:3000')
})

router.get('/confirm', function (req, res, next) {
  console.log(req.query)
  if (req.query.username === 'test') {
    res.send({
      uri: client_redriect_url,// 'http://localhost:8080/#/welcome',
      // 一个Authorization Code对应一个重定向URI和client_id
      code: 't1e2s3t4',
      state: 'test state'
    })
  }
  res.send({
    error: 'error'
  })
})

router.get('/oauth2/token', function (req, res, next) {
  res.setHeader('access-control-allow-origin', '*')
  if (req.query.code === 't1e2s3t4') {
    res.send({
      access_token: 'tEstToKen',
      expires_in: 100,
      token_type: 'bearer',
      refresh_token: 't_t',
      additional_param: 'test param'
    })
  }
})

router.get('/oauth2/me', function (req, res, next) {
  res.setHeader('access-control-allow-origin', '*')
  if (req.query.access_token === 'tEstToKen') {
    res.send({
      client_id: '000001',
      openid: 'qq10001'
    })
  }
})

router.get('/user/get_user_info', function (req, res, next) {
  res.setHeader('access-control-allow-origin', '*')
  if (req.query.access_token === 'tEstToKen') {
    // 查找用户openid为req.query.openid的授权访问信息
    res.send({
      real_name: 'bomb',
      nick_name: 'little boy'
    })
  }
})

module.exports = router;
