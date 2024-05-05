# hola! jotters

[**jotter**](https://thuvasooriya.me/jotter) is a note taking app made with bun and elysiajs. it is super responsive and has a friendly ui (i hope 👽).
made with lots of 🖤 by [thuvasooriya](https://thuvasooriya.me)

## changelog:

- ### v 1.2.8

  - migrating to bun and elysiajs
  - moved to typescript cause why not
  - adding users schema
  - adding jwt
  - adding logging

- ### v 1.2.0

  - migrated from heroku to render
  - migrated from npm to pnpm

- ### v 1.1.0
  - i don't remember what i did here

## stack info

- html, css, js, ajax, bootstrap, fa icons
- ts, jquery and some minor plugins.
- bun
- elysiajs
- mongodb - mongoose
- jwt, jose, picocolors

## todo

- [ ] fix swagger
- [ ] add tests
- [ ] migrating from html?
- [ ] simplify logic
- [ ] host in some domain
- [ ] integrate google keep
- [ ] add user auth and jwt
- [ ] helpful console logs

### mongodb notes

[install community edition to test locally](https://www.mongodb.com/docs/manual/administration/install-community/)

mac specific:

```shell
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0


brew services start mongodb/brew/mongodb-community
brew services stop mongodb-community@7.0
```

### refs

[bun crud with elysiajs and mongodb](https://mirzaleka.medium.com/bun-crud-api-with-elysia-js-mongodb-10e73d484723)

[if you wanna use express instead of elysia](https://blog.bitsrc.io/building-an-api-using-express-js-mongodb-bun-cbac231d1cd3)

[elysia api starter](https://github.com/ProMehedi/elysia-api-starter)
