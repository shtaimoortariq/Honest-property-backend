const models = require('../models');

const telecomProviderController = {
  add: (req, res) => {
    let { name, value } = req.body;

    models.TelecomProvider.create({ name, value })
      .then(telecomProvider => {
        res.json({ success: true, content: telecomProvider });
      })
      .catch(err => {
        // console.log(err)
        res
          .status(500)
          .json({ success: false, message: 'Failed to add telecom provider' });
      });
  },
  listAll: (req, res) => {
    models.TelecomProvider.findAll()
      .then(telecomProviders => {
        res.json({
          success: true,
          content: telecomProviders,
        });
      })
      .catch(err => {
        // noticed you just logged to the console
        // this will make the route just load without a response
        res
          .status(500)
          .json({ success: false, message: 'Error loading telecom providers' });
      });
  },
  
};

module.exports = telecomProviderController;
