const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

const mailchimp = require('../../services/mailchimp');
const mailgun = require('../../services/mailgun');

router.post('/subscribe', async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: 'You must enter an email address.' });
  }

  const result = await mailchimp.subscribeToNewsletter(email);

  if (result.status === 400) {
    return res.status(400).json({ error: result.title });
  }

  await mailgun.sendEmail(email, 'newsletter-subscription');

  res.status(200).json({
    success: true,
    message: 'You have successfully subscribed to the newsletter'
  });
});





router.post('/send/products', async (req, res) => {
  try{
    const {users , products} = req.body;

    if (!users) {
      return res.status(400).json({ error: 'please select user' });
    }
  
    if (!products) {
      return res.status(400).json({ error: 'please select product' });
    }
  
    const productDoc = await Product.find({ _id: { $in: [...products] } });
    var data = {users, productDoc};
    
    await mailgun.sendEmail('', 'newsletter-send', '', data);
  
    res.status(200).json({
      success: true,
      message: 'You have successfully subscribed to the newsletter'
    });

  }catch(error){
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
});


module.exports = router;
