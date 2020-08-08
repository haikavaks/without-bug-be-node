exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.qaBoard = (req, res) => {
  res.status(200).send("User Content.");
};


exports.companyBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.superAdminBoard = (req, res) => {
  res.status(200).send("Super Admin Content.");
};
