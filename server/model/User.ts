import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    @Field(typev => ID)
    id: string;

    @Field()
    name: string;

    @Field({nullable: true})
    mail?: string;

    @Field()
    password: string;
}
