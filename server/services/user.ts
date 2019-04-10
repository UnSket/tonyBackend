import { Db, ObjectID } from 'mongodb';
import { User } from '../model/User';
import { Container, Inject, Service } from 'typedi';

@Service()
export class UserService {
    db: Db;

    constructor (container) {
        this.db = container.get('Db');
    }

    findUserByID = (id): Promise<User> | null => {
        const o_id = new ObjectID(id);
        return new Promise<User>(resolve =>
            this.db.collection('user').findOne({ '_id': o_id }, (_, user) => resolve(user))
        );
    };

    findUsersByName = (name): Promise<Array<User>> | null => {
        return this.db.collection('user').find<User>({ 'name': name }).toArray();
    };

}

export const findUserByID = (id, db, callBack) => {
    const o_id = new ObjectID(id);
    db.collection('user').findOne({ '_id': o_id }, callBack);
};
