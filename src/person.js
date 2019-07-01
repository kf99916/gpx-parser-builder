import Link from './link';

export default class Person {
  constructor(object) {
    this.name = object.name;
    this.email = object.emil;
    this.link = new Link(object.link);
  }
}