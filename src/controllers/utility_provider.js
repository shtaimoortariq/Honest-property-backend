const models = require('../models');

const utilityProviderController = {
  add: (req, res) => {
    let { name, country, type, phone_number } = req.body;

    let phone_chars = '0123456789+()';

    for (let i = 0; i < phone_number.length; i++) {
      if (phone_chars.indexOf(phone_number[i]) === -1) {
        return res.status(400).json({
          success: false,
          message: 'Phone number is invalid',
        });
      }
    }

    models.UtilityProvider.create({ name, country, type, phone_number })
      .then(utilityProvider => {
        res.json({ success: true, content: utilityProvider });
      })
      .catch(err => {
        // console.log(err)
        res
          .status(500)
          .json({ success: false, message: 'Failed to add utility provider' });
      });
  },
  listAll: (req, res) => {
    models.UtilityProvider.findAll()
      .then(utilityProviders => {
        res.json({
          success: true,
          content: utilityProviders,
        });
      })
      .catch(err => {
        // noticed you just logged to the console
        // this will make the route just load without a response
        res
          .status(500)
          .json({ success: false, message: 'Error loading utility orders' });
      });
  },
  
};

module.exports = utilityProviderController;
