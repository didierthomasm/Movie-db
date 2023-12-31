DROP DATABASE IF EXISTS movie_db;
CREATE DATABASE movie_db;

USE movie_db;

CREATE TABLE movies (
    id INT AUTO_INCREMENT,
    movie_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT,
    movie_id INT,
    review TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
);
