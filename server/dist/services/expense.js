"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.html = void 0;
exports.html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello world!</title>
  </head>
  <body>
    <h1>User List</h1>
    <ul>
      {{#each users}}
      <li>Name: {{this.name}}</li>
      <li>Age: {{this.age}}</li>
      <br />
      {{/each}}
    </ul>
  </body>
</html>`;
