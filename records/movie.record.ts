import {ValidationError} from "../utils/error";
import {GenreRecord} from "./genre.record";
import {v4 as uuid} from 'uuid';
import {pool} from "../database/db"
import {MovieEntity} from "../types/movie/movie.record";
import {FieldPacket} from "mysql2";

type MovieRecordResponseType = [MovieRecord[], FieldPacket[]]

export class MovieRecord implements MovieEntity {
    genre: string;
    id?: string;
    rate: number;
    title: string;

    constructor(obj: MovieEntity) {
        if(obj.rate > 10 || obj.rate < 1) {
            throw new ValidationError('rate should be a number between 1-10')
        }

        if(obj.title.length >  50 || obj.title.length < 0) {
            throw new ValidationError('title of movie is incorrect written. title should have length between 1-50 signs.')
        }

        this.id = obj.id;
        this.genre = obj.genre;
        this.rate = obj.rate;
        this.title = obj.title
    }

    async checkGenre(objGenre: string): Promise<boolean> {
        const genreArray = await GenreRecord.getAll()

        return !genreArray.includes(objGenre);
    }

    async insert(): Promise<void> {
        if(await this.checkGenre(this.genre)) {
            throw new ValidationError('unknown genre, different with genres in database');
        }

        if(!this.id) {
            this.id = uuid();
        }

        pool.execute('INSERT INTO `usermovie`(`id`, `title`, `rate`, `genre`) VALUES(:id, :title, :rate, :genre)', {
            id: this.id,
            title: this.title,
            rate: this.rate,
            genre: this.genre,
        })
    }

    async update(): Promise<void> {
        if(await this.checkGenre(this.genre)) {
            throw new ValidationError('unknown genre, different with genres in database');
        }

        await pool.execute('UPDATE `usermovie` set `rate` = :rate WHERE `id` = :id', {
            rate: this.rate,
            id: this.id
        })
    }

    static async getAll(): Promise<MovieEntity[]> {
        const [results] = await pool.execute('SELECT * FROM `usermovie`') as MovieRecordResponseType;

        return results.map(obj => new MovieRecord(obj))
    }

    static async getOne(id: string): Promise<MovieEntity | null> {
        const [results] = await pool.execute('SELECT * FROM `usermovie` WHERE `id` = :id', {
            id,
        }) as MovieRecordResponseType;

        return results.length === 0 ? null : new MovieRecord(results[0])
    }


}
