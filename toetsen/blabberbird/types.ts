import { ObjectId } from "mongodb";

export interface Tweet {
    _id?: ObjectId;
    name: string;
    handle: string;
    text: string;
    createdOn: Date;
}

export interface Profile {
    _id?: ObjectId;
    handle: string;
    name: string;
    bio: string;
}