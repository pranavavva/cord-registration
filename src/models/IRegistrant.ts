import IMongoDate from "./IMongoDate";
import IMongoId from "./IMongoId";

export default interface IRegistrant {
    _id: IMongoId;
    age: number;
    firstName: string;
    lastName: string;
    email: string;
    registrantId: number;
    registrationDate: IMongoDate;
}