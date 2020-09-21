import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    // stripe wants all payments to be in cents. I have to convert USD to cents by a simple * 100. 
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_pf6Q8SYdczif8xQ9MZkZw5p300dJEEkIPs';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        })
            .then(response => {
                alert('Payment successful')
            })
            .catch(error => {
                console.log('Payment error: ', JSON.parse(error));
                alert(
                    'There was an issue with your payment. Please make sure you use the provided credit card'
                );
            })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='King Clothing Llc'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;