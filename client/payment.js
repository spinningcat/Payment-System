window.addEventListener("DOMContentLoaded", async () =>{
        // fetch publishable key from the server
        const { publishableKey } = await fetch("/config").then(r => r.json())
        const stripe = Stripe(publishableKey)
        // fetch clientsecret for payment intent from the server
        async function parameters(){

            // one more fetch to get necessary parametters like currency, amount, 
            // payment method.
            const currency = ""
            const amount = 0
            const paymentMethod = ""
            paymentObject = {
                currency : "usd",
                amount : 1000,
                paymentMethod : "card"
            }     
            result = await paymentintent(paymentObject.currency, paymentObject.amount, paymentObject.paymentMethod)
            //console.log(result)
            return result;
        }

        async function paymentintent(currency, amount, paymentMethod){
            const { clientSecret } = await fetch("/create-payment-intent", {
                method : "POST",
                headers: {
                    "Content-Type" :"application/json"
                },
                body:  JSON.stringify({
                    "currency": currency,
                    "amount": amount,
                    "payment_method" : paymentMethod
                })
            }).then(r => r.json())
            return {"clientSecret" : clientSecret};
        }
        await parameters().then((clientSecret) => {
            console.log( clientSecret.clientSecret ) 
            const elements = stripe.elements({clientSecret}.clientSecret);
            console.log(elements);  
            const paymentElement = elements.create('payment')
            paymentElement.mount('#payment-element')  
            const form = document.getElementById("payment-form");
            form.addEventListener("submit", async(e) => {
                e.preventDefault();
                const {error} = await stripe.confirmPayment({
                elements,
                confirmParams : {
                    return_url : window.location.href.split("?")[0] + "complete.html"
                }
            })
            if(error){
                const messages = document.getElementById("error-message")
                messages.innerText = error.messages;
            }
        })
        })

       
     

       /* const elements = stripe.elements({ clientSecret });
        console.log(elements);
        const paymentElement = elements.create('payment')
        paymentElement.mount('#payment-element')

        const form = document.getElementById("payment-form");
        form.addEventListener("submit", async(e) => {
            e.preventDefault();
            const {error} = await stripe.confirmPayment({
                elements,
                confirmParams : {
                    return_url : window.location.href.split("?")[0] + "complete.html"
                }
            })
            if(error){
                const messages = document.getElementById("error-message")
                messages.innerText = error.messages;
            }
        })*/

})