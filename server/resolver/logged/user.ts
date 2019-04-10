import { User } from '../../model/User';
import { Query, Resolver, Arg, buildSchema } from 'type-graphql';
import { UserService } from '../../services/user';
import { Container } from 'typedi';

@Resolver(returns => User)
class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => [User])
    async getUser(@Arg('name') name: string) {
        const user = await this.userService.findUsersByName(name);
        return user;
    }
}

export async function getSchema() {
    return await buildSchema({
        resolvers: [UserResolver],
        container: Container
    });
}
