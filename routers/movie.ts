import {Router} from "express";
import {GenreRecord} from "../records/genre.record";
import {MovieRecord} from "../records/movie.record";

export const movieRouter = Router();

movieRouter
    .post('/list', async (req, res) => {
        const genre = req.body.genre
        res.json(await MovieRecord.getAllOfGenre(genre));
    })
    .post('/', async (req, res) => {
        const newMovie = new MovieRecord(req.body);
        await newMovie.insert();

        res.json(newMovie);
    })
