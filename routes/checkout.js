const express = require('express');
const router = express.Router();
const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: 'qw47n4kc9kn24wkc',
  publicKey: 'v27dfdmzykzgggzc',
  privateKey: 'a3bb3ae97155039ebe9956d2ff596113'
});


  router.get('/', (req, res, next) => {
    gateway.clientToken.generate(function (err, response) {
      res.send(response.clientToken);
    });
  });

 
    //  router.post('/', (req, res, next) => { })
  // Use the payment method nonce here
  router.post('/', (req, res) => {
    //const nonceFromTheClient = req.body.payment_method_nonce;
    // Use payment method nonce here
   
    const nonceFromTheClient = req.body.paymentMethodNonce;
    console.log(nonceFromTheClient);
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: '2099.00',
    paymentMethodNonce: nonceFromTheClient,
    //paymentMethodToken: "5dmdttb",
    
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true,
      storeInVaultOnSuccess: true
    }
  }, (error, result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});



module.exports = router;