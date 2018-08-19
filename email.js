const env = require('./env.js');
const base64Img = require('base64-img');
const nodemailer = require('nodemailer');
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.qq.com',
            port: 465,
            secure: true,
            auth: {
                user: env.mail.user,
                pass: env.mail.pass
            },
            logger: true,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: `Jumor的机器人邮箱 <${env.mail.user}>`,
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: `Robot <${env.mail.to}>`,

        // Subject of the message
        subject: 'Jumor机器人邮件 ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: `hello world`,
        // attachments: [
        //     // File Stream attachment
        //     {
        //         filename: 'CodingJoker.png',
        //         path: __dirname + '/CodingJoker.png',
        //         cid: 'CodingJoker.png' // should be as unique as possible
        //     }
        // ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
});