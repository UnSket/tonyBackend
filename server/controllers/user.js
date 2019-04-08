import {db} from '../index';
import mongo from "mongodb";

export const findUserByID = (id, db, callBack) => {
    const o_id = new mongo.ObjectID(id);
    db.collection('user').findOne({'_id': o_id}, callBack);
}
