import BaseModel from "./base.model";

export default class Coache extends BaseModel {
    _id: number;
    name: string;
    lastname: string;
    birthDate: Date;
    gender: string;
    email: string;
    statusUser: boolean;
    role: string;
    urlImgCoach: string;
    urlVideoCoach: string;
    resume: string;
    howWork: string;
    linkExternalCall: string;
    firebaseUID: string;
}