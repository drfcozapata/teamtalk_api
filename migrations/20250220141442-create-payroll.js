"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("payrolls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      nonomina: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nodepartamento: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      noempleado: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      nofecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nofechaini: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nofechafin: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nomes: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      noano: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      nosemana: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      nonombre: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      nopago: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      noseccion: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      nooficina: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      cst_hora: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      cst_hrsvac: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_feriados: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_ileg: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_incapacidad: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_maternidad: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_vacaciones: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_dobles: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_dobmix: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_extdob: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_extra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_feriado: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_incapac: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_mixextdob: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_mixtas: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocdob: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocextdob: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_nocextra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_noctu: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_ord: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_otras: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      hrs_vac: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_ajustes: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_anualidad: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_coldest: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comicosme: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comidistri: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_comiventa: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_destacado: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_feriados: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_incap: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_incapins: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_maternidad: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_otros: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_permigoce: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_reintegro: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_retroactivo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      i_vacaciones: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ahoescol: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ahonavid: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ajuste: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_apoaso: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_bpopu: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_ccss: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_compras: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_coope: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_diasnl: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_embargo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_horasnl: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_intapres: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_otros: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_pagos: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_pension: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_prestamaso: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_prestamo: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_rebajoaso: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_rebajocxc: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_renta: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_teleton: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      d_uniforme: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      dias_nl: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      horas_nl: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_bruto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_doble: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_dobmixto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_extdob: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_extra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_feriado: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_hora: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_mixextra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_mixto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_neto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocdoble: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocextra: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_nocturno: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_ordinario: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      sal_vacac: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      salario: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("payrolls");
  },
};
