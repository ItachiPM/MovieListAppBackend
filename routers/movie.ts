import {Router} from "express";
import {MovieRecord} from "../records/movie.record";
import {MovieEntity} from "../types";

export const movieRouter = Router();

movieRouter
    .post('/list', async (req, res) => {
        const genre = req.body.genre
        res.json(await MovieRecord.getAllOfGenre(genre));
    })
    .post('/', async (req, res) => {
        const movie: MovieEntity = {
            ...req.body,
            rate: Number(req.body.rate)
        }
        const newMovie = new MovieRecord(movie);
        await newMovie.insert();

        res.json(newMovie);
    })
