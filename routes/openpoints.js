const express = require('express');
const router = express.Router();
const request = require('request');
const jwt = require("jsonwebtoken");
const fs = require('fs');

module.exports = function(app) {

  router.get("/cards", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/cards',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/cardsManagement", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/cardsManagement',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/reviews", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/reviews',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/releases", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/releases',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/prototypes", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/prototypes',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/filters", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-api.domain.net/api/filters',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

// TEMP FOR DEMO PURPOSES

  router.get("/flat", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/flat',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/tree", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/tree',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/estimates", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/estimate',
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  router.get("/estimates/:id", function(req, res, next) {
    request({
      method: 'GET',
      url: 'http://site-json-prod-api.domain.net/api/estimate' + req.params.id,
      headers: {
        'user-agent': 'saa',
        'Content-Type': 'application/json'
      }
    }, (error, response, body) => {
      return res.status(200).send(body);
    });
  });

  return router;
};
