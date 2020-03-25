const random = require('randomstring')
const request = require('request')
const colors = require('colors')
const date = require('date-time')
const fs = require('fs')
const agent = require('proxy-agent')
var stream = fs.createWriteStream(`${random.generate({ length: 25, charset: 'alphanumeric' })}.txt`)
stream.once('open', function (fd) {
    for (var i = 0; i < process.argv[2]; i++) {
        let proxy = `http://auto:${random.generate({ length: 25, charset: 'alphanumeric' })}@proxy.apify.com:8000`
        request({
            method: 'GET',
            url: 'https://google.com/ncr',
            agent: new agent(proxy)
        }, function (err, res, body) {
            if (!err)
                if (body.includes('Google')) {
                    console.log(`[Live] ${proxy}`.green)
                    stream.write(`[Live] ${proxy}\r\n`)
                }
            else if (body.includes('Selected proxy groups have no usable proxies.')) {
                console.log(`[Live] ${proxy}`.green)
                stream.write(`[Live] ${proxy}\r\n`)
            } else {
                console.log(`[Die] ${proxy}`.red)
                stream.write(`[Die] ${proxy}\r\n`)
            } else {
                console.log(`[Die] ${proxy}`.red)
                stream.write(`[Die] ${proxy}\r\n`)
            }
        })
    }
})