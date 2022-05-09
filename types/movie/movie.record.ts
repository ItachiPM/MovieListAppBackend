export interface MovieEntity {
    id?: string;
    title: string;
    rate: number;
    genre: string;
}

export interface MovieEditReqEntity {
    id: string;
    rate: number;
    genre: string;
}
