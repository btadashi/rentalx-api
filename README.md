<h1 align="center">Rentalx</h1>
<p align="center">API for renting a car</p>

<p align="center">
 <a href="#about">About</a> •
 <a href="#technologies">Technologies</a> •
 <a href="#getting-started">Getting Started</a> •
 <a href="#contribution">Contribution</a> •
 <a href="#license">License</a> •
 <a href="#author">Author</a>
</p>

## About
<p align="justify">Node.js API for renting car.</p>


## Technologies
The project's been developed using the following technologies:
- Typescript
- Node.js
- Express
- Multer
- TypeORM
- JSON Web Token
- Docker
- PostgreSQL
- Swagger
- Jest
- SuperTest

## Getting Started
```bash
# Clone this repository
$ git clone https://github.com/btadashi/rentalx-api

# Navigate to the folder 'backend'
$ cd rentalx-api

# Install all dependencies:
$ yarn

# Start all the services and the application with Docker Compose
$ docker-compose up -d

# Run the migrations:
$ yarn typeorm migration:run

# Start application:
$ yarn dev

# Access the api documentation at: http://localhost:3333/api-docs/
```

## Contribution
1. Fork this repository.
2. Create a new branch with your changes ```git checkout -b my-feature```
3. Commit your changes to the branch ```git commit -m "feature: My feature"```
4. Now just push it ```git push origin my-feature```
5. Submit pull request
## License
This project is under MIT license.
## Author
This project's been developed by <a href="https://www.linkedin.com/in/bruno-yamaguchi/">Bruno Yamaguchi</a> during Ignite Node.js.
