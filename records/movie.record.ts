import {ValidationError} from "../utils/error";
import {GenreRecord} from "./genre.record";
import {v4 as uuid} from 'uuid';
import {pool} from "../database/db"
import {MovieEntity} from "../types";
import {FieldPacket} from "mysql2";

type MovieRecordResponseType = [MovieRecord[], FieldPacket[]]

export class MovieRecord implements MovieEntity {
    genre: string;
    id?: string;
    rate: number;
    title: string;

    constructor(obj: MovieEntity) {
        if (obj.rate > 10 || obj.rate < 1) {
            throw new ValidationError('rate should be a number between 1-10.')
        }

        if (obj.title.length >= 51 || obj.title.length <= 0) {
            throw new ValidationError('title of movie is incorrect written. title should have length between 1-50 signs.')
        }

        this.id = obj.id;
        this.genre = obj.genre;
        this.rate = obj.rate;
        this.title = obj.title
    }

    set movieGenre(newValue: string) {
        this.genre = newValue
    }

    set movieRate(newValue: number) {
        this.rate = newValue
    }

    async checkGenre(objGenre: string): Promise<boolean> {
        const genreArray = await GenreRecord.getAll()

        return !genreArray.includes(objGenre);
    }

    async checkTitle(): Promise<boolean> {
        const [results] = await pool.execute('SELECT * FROM `usermovie`') as MovieRecordResponseType;

        return !results.find(movie => movie.title === this.title)
    }

    async insert(): Promise<void> {
        if (await this.checkGenre(this.genre)) {
            throw new ValidationError('unknown genre, different with genres in database');
        }
        if(!(await this.checkTitle())) {
            throw new ValidationError('This movie is already on your list.');
        }

        if (!this.id) {
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
        if (await this.checkGenre(this.genre)) {
            throw new ValidationError('unknown genre, different with genres in database');
        }

        await pool.execute('UPDATE `usermovie` set `rate` = :rate, `genre` = :genre WHERE `id` = :id', {
            rate: this.rate,
            genre: this.genre,
            id: this.id,
        })
    }

    static async getAllOfGenre(genre: string): Promise<MovieEntity[]> {
        const [results] = await pool.execute('SELECT * FROM `usermovie` WHERE `genre` = :genre ORDER BY `rate` DESC', {
                genre,
            }) as MovieRecordResponseType;

        return results.map(obj => new MovieRecord(obj))
    }

    static async getOne(id: string): Promise<MovieEntity | null> {
        const [results] = await pool.execute('SELECT * FROM `usermovie` WHERE `id` = :id', {
            id,
        }) as MovieRecordResponseType;

        return results.length === 0 ? null : new MovieRecord(results[0])
    }


}
