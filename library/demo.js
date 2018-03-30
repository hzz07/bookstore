var Alipay = require('./alipay');
var utl = require('./utl');

    var ali = new Alipay({
            appId: '2016091100483789',
            notifyUrl: 'http://127.0.0.1:3000/',
            rsaPrivate: path.resolve('./key/app_private_key.pem'),
            rsaPublic: path.resolve('./key/alipay_public_key.pem'),
            sandbox: true,
            signType: 'RSA2'
        });
        var url = ali.webPay({
            body: "ttt",
            subject: "ttt1",
            outTradeId: new Date().toString(),
            timeout: '90m',
            amount: "0.1",
            sellerId: '',
            product_code: 'FAST_INSTANT_TRADE_PAY',
            goods_type: "1",
            return_url: "http://127.0.0.1:3000/",
        })
        var url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
        console.log(url_API);

        