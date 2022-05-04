import {Router} from "express";
import {GenreRecord} from "../records/genre.record";

export const genreRouter = Router();

genreRouter.get('/', async (req, res) => {
    res.json(await GenreRecord.getAll())
})
