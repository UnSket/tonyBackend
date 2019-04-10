export class Person {
    constructor(private name, private age?: number) {
    }

    setAge(age) {
        this.age = age;
    }
}
