const { User, PersonalProfile, IncomesOutcome } = require("../models");

class PayrollController {
  static async index(req, res) {
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
      return res.status(500).json({ message: "Error del servidor" });
    }
  }
}

module.exports = PayrollController;
