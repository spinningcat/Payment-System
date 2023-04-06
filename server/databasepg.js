const pg = require("pg")

var config = {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "payments",
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 
  }
/*const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1234",
    database: "payments"
});*/
const pool = new pg.Pool(config);




let timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');


const inserValues = async(APIKey, SecretKey, Currency, Amount, PaymentMethod, StartDate, EditDate) => {
    pool.connect(function(err, client, done){

    try {
        if(err) {
            return console.error('connexion error', err);
        }
        client.query(
            'INSERT INTO public.parameterstable("APYKey", "SecretKey", "Currency", "Amount", "PaymentMethod", "createAt","editedAt") VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [APIKey, SecretKey, Currency, Amount, PaymentMethod, StartDate, EditDate], function(err, result){
            done();
            if(err) {
                return console.error('error running query', err);
            }
            }); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
    /*} finally {
        pg.end();            
    }*/
    });
}
inserValues('sdfsf', 'dfdfddf', 'eur', 1000, 'card', timestamp, timestamp).then(result => {
    if (result) {
        console.log('User inserted');
    }
});

