# hola! jotters

[**jotter**](https://thuvasooriya.me/jotter) is a note taking app made with bun and elysiajs. it is super responsive and has a friendly ui (i hope 👽).
made with lots of 🖤 by [thuvasooriya](https://thuvasooriya.me)

## changelog:

- ### v 1.2.9

  - migrating to [fly](https://fly.io) for deployment cause it's awesome
    the migration was super easy
    click [here](https://fly.io/ref/go-fly-nix) to get 50 credits for free, thanks to [xe](https://xeiaso.net/)
    ```sh
    fly auth login
    fly launch
    fly secrets import < .env
    # one disadvantage is fly doesn't support
    # static egress ip addresses so you have to
    # allow access from anywhere in mongodb atlas
    # make changes and
    fly deploy
    ```

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

## stack n stuff

- html, css, js, ajax, bootstrap, fa icons
- ts, jquery and some minor plugins.
- bun bun bun
- elysiajs
- mongodb - mongoose
- jwt, jose, picocolors
- docker
- fly.io flyctl

## todo

- [ ] fix swagger
- [ ] migrate to svelte
- [ ] simplify logic
- [ ] use shadecn components
- [ ] make and set a fucking darkmode as default
- [ ] add user auth and jwt
- [ ] optimize docker with nix if possible
- [ ] integrate google keep
- [ ] tests
- [ ] helpful console logs
- [x] ~host in some domain~ just have it in your subdomain

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
