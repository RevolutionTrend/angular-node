# AngularNode

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Custom Order

Run `node www.js` to start node server.
Run `ng build --watch` or `npm run watch`, then open `localhost:4200` on web browser.

# # 解决Angular路由和nodeJS冲突

方法一:
node监听端口设置为angular serve不一样的端口，并允许跨域
启动命令: ng serve

方法二：
node监听到路由请求时，统一发送到index.html
启动命令： 见`Custom Order`
