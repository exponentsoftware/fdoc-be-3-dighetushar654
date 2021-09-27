const {check, validationResult} = require('express-validator');
exports.validateUser =[
        check('username', 'name is required').not().isEmpty(),
        check('todotitle', 'Please enter todotitle email').not().isEmpty(),
        check('status', 'Please enter status completed or not completed').not().isEmpty(),
        check('category', 'Enter category ex. hobby, work and task').not().isEmpty(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty())
              return res.status(422).json({errors: errors.array()});
            next();
          },

];