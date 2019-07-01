export default class Link {
  constructor(object) {
    this.$ = {};
    this.$.href = object.$.href || object.href;
    this.text = object.text;
    this.type = object.type;
  }
}