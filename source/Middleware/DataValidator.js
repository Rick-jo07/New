import { body } from 'express-validator'

export const validateCreateTodo = [
    body('title')
    .notEmpty()
    .withMessage('Title Is Required')
    .isLength({ min : 3 })
    .withMessage('At Least 3 character Length'),

    body('completed')
    .isBoolean()
    .withMessage('Must Be true of false')
    .notEmpty()
    .withMessage('Progress Is Required'),
]

export const validateUpdateTodo = [
    body('completed')
    .notEmpty()
    .withMessage('Title Is Required')
    .isBoolean()
    .withMessage('Must Be true of false'),
]