document.addEventListener("DOMContentLoaded", async() => {
       const {publishableKey} = await fetch("/config").then(r => r.json())
       const stripe = Stripe(publishableKey); 

       const params = new URLSearchParams(window.location.href)
       const clientSecret = params.get("payment_intent_client_secret");

       const paymentIntent = await stripe.retrievePaymentIntent(clientSecret);
       console.log(paymentIntent.paymentIntent.status)
       axios.post("https://test.gesume.com/api/payment/status\new", {
            //"key": "wedrfwqefwf",
            "status" : paymentIntent.paymentIntent.status
       })
       const paymentIntentPre = document.getElementById("payment-intent");
       paymentIntentPre.innerText = JSON.stringify(paymentIntent, null, 2)


})