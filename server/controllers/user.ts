import { ObjectID } from 'mongodb';

export const findUserByID = (id, db, callBack) => {
    const o_id = new ObjectID(id);
    db.collection('user').findOne({'_id': o_id}, callBack);
};
