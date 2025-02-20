const db = require("../models");
const User = db.User;
const IncomesOutcome = db.IncomesOutcome;
const PersonalProfile = db.PersonalProfile;

exports.index = async (req, res) => {
  try {
    const user = req.user;
    let payrolls = [];
    let personalProfile = null;
    const incomesOutcomes = await IncomesOutcome.findAll();

    if (user.role === "SuperAdmin" || user.role === "Administrador") {
      payrolls = await User.findAll({
        include: [
          { model: PersonalProfile, as: "personalProfile" },
          { model: Payroll, as: "payrolls" },
        ],
      });
    } else if (user.role === "Empleado") {
      payrolls = await user.getPayrolls();
      personalProfile = await user.getPersonalProfile();
    }

    return res.json({
      user,
      payrolls,
      personalProfile,
      incomesOutcomes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};
