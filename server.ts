import express from 'express';
const app  = express();
import path from 'path'
import {findingDriver, router, national, winners} from './routes/AdminRoute';
import {knex} from './Database/Access';
import ejs from 'ejs';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

app.post('/finding', findingDriver);
app.get('/', national);

app.use('/winners', winners)


app.listen(5000, ()=>{

        console.log('Server Running')
}   
)

