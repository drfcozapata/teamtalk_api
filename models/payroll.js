"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payroll extends Model {
    static associate(models) {
      Payroll.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Payroll.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      nonomina: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      nodepartamento: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      noempleado: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      nofecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nofechaini: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nofechafin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nomes: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      noano: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      nosemana: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      nonombre: {
        type: DataTypes.STRING(70),
        allowNull: false,
      },
      nopago: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      noseccion: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      nooficina: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      cst_hora: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      cst_hrsvac: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_feriados: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_ileg: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_incapacidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_maternidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_vacaciones: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_dobles: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_dobmix: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_extdob: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_extra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_feriado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_incapac: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_mixextdob: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_mixtas: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocdob: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocextdob: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocextra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_noctu: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_ord: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_otras: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_vac: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_ajustes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_anualidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_coldest: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comicosme: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comidistri: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comiventa: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_destacado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_feriados: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_incap: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_incapins: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_maternidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_otros: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_permigoce: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_reintegro: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_retroactivo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_vacaciones: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ahoescol: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ahonavid: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ajuste: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_apoaso: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_bpopu: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ccss: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_compras: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_coope: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_diasnl: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_embargo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_horasnl: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_intapres: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_otros: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_pagos: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_pension: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_prestamaso: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_prestamo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_rebajoaso: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_rebajocxc: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_renta: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_teleton: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_uniforme: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_nl: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      horas_nl: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_bruto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_doble: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_dobmixto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_extdob: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_extra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_feriado: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_hora: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_mixextra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_mixto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_neto: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocdoble: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocextra: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocturno: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_ordinario: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_vacac: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      salario: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Payroll",
      tableName: "payrolls",
    }
  );
  return Payroll;
};
