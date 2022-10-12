const { TWILIO_SID, TWILIO_TOKEN, TWILIO_SERVICE, STRIPE_PUBLIC, STRIPE_SECRET } = process.env
const client = require('twilio')(TWILIO_SID, TWILIO_TOKEN, { lazyLoading: true })
const stripe = require('stripe')(STRIPE_SECRET)

const sendOTP = async (req, res) => {
    const { phone } = req.body
    try {
        const otpResponse = await client.verify
            .services(TWILIO_SERVICE)
            .verifications.create({
                to: `+91${phone}`,
                channel: "sms"
            });
        res.status(200).send(`OTP send Successfully!:${JSON.stringify(otpResponse)}`)
    }
    catch (err) {
        return res.status(422).send({ status: false, message: err.message })
    }
}


const verifyOTP = async (req, res) => {
    const { phone, otp } = req.body
    try {
        const verifiedResponse = await client.verify
            .services(TWILIO_SERVICE)
            .verificationChecks.create({
                to: `+91${phone}`,
                code: otp
            })
        return res.status(200).send(`OTP verified successfully! ${JSON.stringify(verifiedResponse)}`)
    } catch (err) {
        return res.status(err?.status || 400).send(err?.message || 'Something went wrong!')
    }
}

const createToken = async (cardData) => {
    try {
        const { card_no, month, year, cvc } = cardData
        const token = await stripe.tokens.create({
            card: {
                number: `${card_no}`,
                exp_month: `${month}`,
                exp_year: `${year}`,
                cvc: `${cvc}`,
            },
        });
        return token
        // const charge = await stripe.charges.create({
        //     amount: amount * 100,
        //     description: description,
        //     currency: "INR",
        //     customer: customer.id

        // })
        // return res.status(201).send({ status: true, message: `${paymentMethod}` })
        // stripe.customers.create({
        //     email: email,
        //     source: {
        //         object: "card",
        //         number: card_no,
        //         exp_month: month,
        //         exp_year: year,
        //         cvc: cvc
        //     }

        // })
        //     .then(customer => stripe.charges.create({
        //         amount: amount * 100,
        //         description: description,
        //         currency: "INR",
        //         customer: customer.id
        //     })
        //     ).then(charge => {
        //         console.log(charge)
        //         return res.status(200).send({ status: true, message: "Success" })
        //     }).catch(err => {
        //         return res.status(404).send({ status: false, message: err.message })
        //     })
    } catch (err) {
        return err.message
    }
}

const createCharge = async (tokenId, amount, description) => {
    try {
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: tokenId,
            description: description
        })
        return charge
    } catch (err) {
        return err.message
    }
}

const payment = async (req, res) => {
    const token = await createToken(req.body)
    console.log(token)
    if (token !== "") {
        const charge = await createCharge(token.id, req.body.amount, req.body.description)
        console.log(charge)
        if (charge !== "") {
            res.send('Payment Completed')
        }
    }
}


module.exports = {
    sendOTP,
    verifyOTP,
    payment
}