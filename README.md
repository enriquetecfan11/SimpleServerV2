<h1  align="center">Simple IOT Server</h1>
<p  align="center">
A simple server made with NodeJS and Express and PostgreSQL Database for test IOT Devices easy
The difference between Simple Sever and this server have connection with PostgreSQL.
<p>
<p>
<br />

## 🚀 Technologies

Node, Express and PostgreSQL Database

## 📝 Contributing

This is and open source project if you want to collaborate look at issues and choose you want to collaborate

### Quick Start

In order to start testing the server, you must follow these steps:

```console
$ git clone https://github.com/enriquetecfan11/SimpleServer.git
```

Install dependencies:

```console
$ npm install
```

  Start the server normal mode:

```console
$ npm start
```

Start Server Developer Mode:

```console
$ npm run dev
```

### 🐳 Quick Start Docker

If you want use this with docker:

First create image:

```console
$ docker build -t simple-server .
```

Second run image:

```console
$ docker run --d -p 5000:5000 --name simpleserver simple-server 
```

If you want to create a docker image with PostgreSQL

First enter into db folder

Second create db image:

```console
docker build -t my-postgres .
```	
Run docker image:

```console
docker run -d --name my-postgres-container -p 5432:5432 my-postgres
```

Made with ❤️ by `<a href="https://github.com/enriquetecfan11" target="_blank">`Enrique Rodriguez `</a>`
