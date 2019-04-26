# Phonebook Frontend
***
Phonebook is a web tool made to provide a set of entries that contain a first name, last name, and a phone number.

This tool will allow you to:

  - Add new entries
  - Edit your entries
***
### Architecture
This application uses:

* [React] 
* [Redux]

Deployed at: http://ec2-18-216-219-102.us-east-2.compute.amazonaws.com:8080/

***
### Installation

Requires [Node.js](https://nodejs.org/) v4+ to run.

Clone the repository, install the dependencies and start the server.

```sh
$ git clone https://github.com/jvelasquezm1/phonebook_front
$ cd phonebook_front
$ npm install
$ npm start
```

The app will run in port 3000 by default.

### Docker

If you want to deploy phonebook front in a Docker Container run:

```sh
docker build -t phonebook_front .
docker run -p 8080:8080 phonebook_front
```

If you want to deploy the full architecture of the phonebook locate the root folder of the project phonebook_back and run:

```sh
cd phonebook_back
docker-compose up
```

This will create 2 containers:
- phonebook_back (exposed on port 3000 from localhost)
- phonebook_front (exposed on port 8080 from localhost)
