import {Router} from "express";
import {MovieRecord} from "../records/movie.record";
import {MovieEntity} from "../types";

export const movieRouter = Router();

movieRouter
    .post('/list', async (req, res) => {
        const genre = req.body.genre
        res.status(200).json(await MovieRecord.getAllOfGenre(genre));
    })
    .post('/', async (req, res) => {
        const movie: MovieEntity = {
            ...req.body,
            rate: Number(req.body.rate)
        }
        const newMovie = new MovieRecord(movie);
        await newMovie.insert();

        res.status(201).json(newMovie);
    })
    .patch('/', async (req, res) => {
        const {id, genre, rate} = req.body
        const editMovie = new MovieRecord(await MovieRecord.getOne(id));
        editMovie.movieGenre = genre;
        editMovie.movieRate = rate;
        await editMovie.update();

        res.json(editMovie.genre)
    })
