const db = require("../models");
const Gadget = db.gadget;

//Create new Gadget
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "Gadget content can not be empty"
    });
  }

  // Create a Gadget
  const gadget = new Gadget({
    brand: req.body.brand,
    model: req.body.model,
    osVersion: req.body.osVersion,
    type: req.body.type,
    pending: req.body.pending || true,
  });

  // Save Gadget in the database
  gadget.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while creating the gadget."
    });
  });
};

// Retrieve all gadgets from the database.
exports.findAll = (req, res) => {
  Gadget.findAll()
    .then(gadgets => {
      res.send(gadgets);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while retrieving gadgets."
    });
  });
};

// Find a single gadget with a gadgetId
exports.findOne = (req, res) => {
  Gadget.findByPk(req.params.gadgetId)
    .then(gadget => {
      if (!gadget) {
        return res.status(404).send({
          message: "Gadget not found with id " + req.params.gadgetId
        });
      }
      res.send(gadget);
    }).catch(err => {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Gadget not found with id " + req.params.gadgetId
      });
    }
    return res.status(500).send({
      message: "Something wrong retrieving gadget with id " + req.params.gadgetId
    });
  });
};

// Update a gadget
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Gadget content can not be empty"
    });
  }
  Gadget.update(
    {
      brand: req.body.brand,
      model: req.body.model,
      osVersion: req.body.osVersion,
      type: req.body.type,
      pending: req.body.pending,
    },
    { returning: true, where: { id: req.params.gadgetId } }
  )
    .then(([rowsUpdate, [gadget]]) => {
      if (!gadget) {
        return res.status(404).send({
          message: "Gadget not found with id " + req.params.gadgetId
        });
      }
      res.send(gadget);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Gadget not found with id " + req.params.gadgetId
        });
      }
      console.log(err)
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.gadgetId
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

  Gadget.destroy({
    where: {
      id: req.params.gadgetId
    },
    force: true
  })
    .then(gadget => {
      if (!gadget) {
        return res.status(404).send({
          message: "Gadget not found with id " + req.params.gadgetId
        });
      }
      res.send({ message: "Gadget deleted successfully!" });
    }).catch(err => {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Gadget not found with id " + req.params.gadgetId
      });
    }
    return res.status(500).send({
      message: "Could not delete gadget with id " + req.params.gadgetId
    });
  });
};
