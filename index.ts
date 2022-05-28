import * as express from 'express';
import 'express-async-errors' ;
import * as cors from 'cors';
import {genreRouter} from "./routers/genre";
import {movieRouter} from "./routers/movie";
import {handleError} from "./utils/error";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(express.json());

app.use('/genre', genreRouter)
app.use('/movie', movieRouter)


app.use(handleError)


app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
