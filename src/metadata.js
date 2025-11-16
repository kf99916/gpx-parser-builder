import Copyright from './copyright.js';
import Link from './link.js';
import Person from './person.js';
import Bounds from './bounds.js';

export default class Metadata {
  constructor(object) {
    this.name = object.name;
    this.desc = object.desc;
    this.time = object.time ? new Date(object.time) : new Date();
    this.keywords = object.keywords;
    this.extensions = object.extensions;
    if (object.author) {
      this.author = new Person(object.author);
    }
    if (object.link) {
      if (!Array.isArray(object.link)) {
        object.link = [object.link];
      }
      this.link = object.link.map(l => new Link(l));
    }
    if (object.bounds) {
      this.bounds = new Bounds(object.bounds);
    }
    if (object.copyright) {
      this.copyright = new Copyright(object.copyright);
    }
  } 
}