const ErrorMessage = require('./customMessage').ErrorMessage;
const SuccessMessage = require('./customMessage').SuccessMessage;

module.exports = {
  sendResponse(req, res, message) {
    if(message.err && message.err.stack && message.err.message)
      message.err = {message:message.err.toString(),stack: message.err.stack};

    switch (message.code) {
      case SuccessMessage.CREATING_OBJECT_SUCCESS:
        return res.status(201).send(message);
        break;
      case SuccessMessage.GETTING_DATA:
        return res.status(200).send(message);
        break;
      case SuccessMessage.DELETING_OBJECT_SUCCESS:
        return res.status(200).send(message);
        break;
      case SuccessMessage.VERIFICATION_CODE_SUCCESS:
      return res.status(200).send(message);
      break;
      case SuccessMessage.UPDATING_OBJECT_SUCCESS:
        return res.status(200).send(message);
        break;
      case SuccessMessage.EMAIL_SENT:
        return res.status(200).send(message);
        break;
      case SuccessMessage.RESET_PASSWORD:
        return res.status(200).send(message);
        break;
      case ErrorMessage.CREATING_OBJECT_ERROR:
        return res.status(500).send(message);
        break;
      case ErrorMessage.OBJECT_NOT_FOUND:
        return res.status(404).send(message);
        break;
      case ErrorMessage.DATABASE_ERROR:
        return res.status(401).send(message);
        break;
      case ErrorMessage.UPDATING_OBJECT_ERROR:
        return res.status(400).send(message);
        break;
      case ErrorMessage.INVALID_PARAMS:
        return res.status(400).send(message)
        break;
      case ErrorMessage.INVALID_PASSWORD:
        return res.status(400).send(message)
        break;
      case ErrorMessage.INVALID_USERNAME_PASSWORD:
        return res.status(400).send(message)
        break;
      case ErrorMessage.DELETING_OBJECT_ERROR:
        return res.status(400).send(message);
        break;
      case ErrorMessage.VALIDATING_OBJECT_ERROR:
        return res.status(422 ).send(message);
        break;
      case ErrorMessage.INVALID_VERIFICATION_CODE:
        return res.status(400).send(message);
        break;
      case ErrorMessage.BAD_REQUEST:
        return res.status(400).send(message);
        break;
      case ErrorMessage.FETCHING_DATA_ERROR:
        return res.status(403).send(message);
        break;
      // case ErrorMessage.ALREADY_ENROLLED:
      //   return res.status(400).send(message);
      //   break;
      // case ErrorMessage.UNAUTHORIZATION_ERROR:
      //   return res.status(401).send(message);
      //   break;
      // case ErrorMessage.ALREADY_CREATED:
      //   return res.status(401).send(message);
      //   break;
      case ErrorMessage.AUTHENTICATION_ERROR:
        return res.status(401).send(message);
        break;
      case ErrorMessage.DUPLICATION_ERROR:
        return res.status(409).send(message);
        break;
      // case ErrorMessage.ALREADY_CREATED:
      //   return res.status(401).send(message);
      //   break;
      // case ErrorMessage.UNSUPPORTED_OPERATION:
      //   return res.status(401).send(message);
      //   break;

      default:
        return res.status(200).send(message);
    }
  },
};
