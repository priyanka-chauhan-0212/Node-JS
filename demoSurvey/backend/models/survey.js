// const Sequelize = require("sequelize");
// const models = require("./index");
// module.exports = function (sequelize, DataTypes) {
//   return sequelize.define(
//     "survey",
//     {
//       id: {
//         autoIncrement: true,
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       name: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//       survey_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       answer1: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       //   score_value: {
//       //     type: DataTypes.INTEGER,
//       //     allowNull: true,
//       //   },
//       //   review_message: {
//       //     type: DataTypes.STRING(255),
//       //     allowNull: true,
//       //   },
//       //   ip_address: {
//       //     type: DataTypes.STRING(255),
//       //     allowNull: true,
//       //   },
//       //   website: {
//       //     type: DataTypes.STRING(255),
//       //     allowNull: true,
//       //   },
//       //   url: {
//       //     type: DataTypes.STRING(255),
//       //     allowNull: true,
//       //   },
//       //   token: {
//       //     type: DataTypes.STRING(255),
//       //     allowNull: true,
//       //   },
//     },
//     {
//       sequelize,
//       tableName: "survey_response",
//       timestamps: true,
//       underscored: true,
//       // classMethods: {
//       // 	associate: function ({ survey }) {
//       // 		Orders.hasMany(survey);
//       // 	},
//       // },
//       indexes: [
//         {
//           name: "PRIMARY",
//           unique: true,
//           using: "BTREE",
//           fields: [{ name: "id" }],
//         },
//       ],
//     }
//   );
// };
