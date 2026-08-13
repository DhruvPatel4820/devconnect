const ApiError = require("../utils/ApiError");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    // yaha oe schema registerSchema ya login Schema ke equal h jo bhi ham validate function ko pass kar rahe h or is
    //  schema ke andar ek validate nam ka method hota h jiske through jam apne sari input field ko validate karte h
    //  and at the end ye {
    //     value:{...},
    //     error:{
    //        details:[
    //           {
    //              message:"Email is required"
    //           }
    //        ]
    //     }
    // } return karta h jisko destructure karke error dekhte h

    if (error) {
      return next(new ApiError(400, error.details[0].message));
    }

    next();
  };
};

module.exports = validate;
