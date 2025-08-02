import { body, param } from 'express-validator';

export const signupValidation = [
    body('name')
        .trim()
        .escape(),
    body('email')
        .trim()
        .isEmail()
        .escape(),
    body('pwd')
        .trim()
        .escape()
]

export const loginValidation = [
    body('email')
        .trim()
        .escape(),
    body('pwd')
        .trim()
        .escape()
];

export const catValidation = [
    body('title')
        .trim()
        .escape(),
    body('desc')
        .trim()
        .escape(),
    body('lat')
        .isNumeric()
        .toFloat(),
    body('lon')
        .isNumeric()
        .toFloat()
];

export const getCatValidation = [
    param('id')
        .isInt
];

export const commentValidation = [
    body('comment')
        .trim()
        .escape()
];




