import {pool} from "../database/db";
import {FieldPacket} from "mysql2";
import {GenreEntity} from "../types";

type GenreRecordResults =[GenreRecord[], FieldPacket[]]

export class GenreRecord implements GenreEntity {
    public genre: string;

    static async getAll(): Promise<string[]> {
        const [results] = await pool.execute('SELECT `genre` FROM `filmgenres`') as GenreRecordResults

        return results.map(obj => obj.genre);
    }
}
