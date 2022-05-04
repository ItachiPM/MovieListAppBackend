import {Router} from "express";
import {GenreRecord} from "../records/genre.record";
import {MovieRecord} from "../records/movie.record";

export const movieRouter = Router();

movieRouter
    .get('/list', async (req, res) => {
        res.json(await MovieRecord.getAllOfGenre('drama'));
    })
    .post('/', async (req, res) => {
        const newMovie = new MovieRecord(req.body);
        await newMovie.insert();

        res.json(newMovie);
    })
