const express = require("express");
const ErrorMessage = require("../../utils/customMessage").ErrorMessage;
const sendResponse = require("../../utils/RenderResponseUtil.js").sendResponse;
const Promise = require("bluebird");

module.exports = ({ validator, _error }) => {
  return (req, res, next) =>
    new Promise((resolve, reject) => {
      let errors = (req.checkBody(validator) || {}) && {
        ...Object.assign({}, ...(req.validationErrors() || [])),
        empty: !req.validationErrors(),
        _error,
      };
      let result = !errors.empty
        ? sendResponse(
            req,
            res,
            new ErrorMessage(ErrorMessage.BAD_REQUEST, errors)
          )
        : null;
      return result ? reject(result) : resolve(next());
    });
};
