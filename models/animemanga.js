'use strict';
const db = require('../db/config');
const Animemanga = {};

Animemanga.findAll = id => {
  return db.query(
    `
    SELECT *, series.id FROM series
    JOIN users ON series.user_id = users.id
    WHERE users.id = $1
    `,
    id
  );
};

Animemanga.findById = id => {
  return db.oneOrNone('SELECT * FROM series WHERE id = $1', [id]);
};

Animemanga.create = series => {
  return db.one(
    `INSERT INTO series
    (title, series_type, url, episodes_watched, chapters_read, status, rating, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      series.title,
      series.series_type,
      series.url,
      series.episodes_watched,
      series.chapters_read,
      series.status,
      series.rating,
      series.user_id
    ]
  );
};

module.exports = Animemanga;
