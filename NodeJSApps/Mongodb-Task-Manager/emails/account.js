const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRID_API_KEY || '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'

sgMail.setApiKey(sendgridAPIKey)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: 'sunil.maurya01@gmail.com',
        from: 'sunil.maurya01@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name} . let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: 'sunil.maurya01@gmail.com',
        from: 'sunil.maurya01@gmail.com',
        subject: 'Sorry to see you go',
        text: `Good bye, ${name} . I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}