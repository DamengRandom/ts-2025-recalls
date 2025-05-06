// Implements vs Extends

// Implements:
// - 实现接口
// - 类必须实现接口中的所有方法
// - 类可以实现多个接口
// - 类可以继承一个类

// Code example:

class TheAnimal {
    eat() { console.log("动物在吃东西"); };
    sleep() { console.log("动物在睡觉"); };
}

class DogOne implements TheAnimal {
    eat() {
        console.log("狗在吃东西");
    }
    sleep() {
        console.log("狗在睡觉");
    }
}

const dogOne = new DogOne();

dogOne.eat();
dogOne.sleep();


// Extends:
// - 继承父类
// - 类可以继承一个类
// - 类可以继承多个类
// - 类可以实现一个接口


// code example:

class Animal {
    eat() {
        console.log("动物在吃东西");
    }
} 

class Dog extends Animal {
    pee() {
        console.log("狗在尿尿");
    }
}

const dog = new Dog();

dog.eat();
dog.pee();

// 总结:
// - 实现接口: 类必须实现接口中的所有方法
// - 继承父类: 类可以继承一个类
// - 实现接口: 类可以实现一个接口
// - 继承父类: 类可以继承多个类
