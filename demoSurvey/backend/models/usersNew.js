const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "usersnew",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: "1 = Super Admin, 2 = Subscriber",
      },
      name: {
        type: DataTypes.STRING(191),
        allowNull: true,
      },
      first_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      layoutDetail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sheetID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(191),
        allowNull: false,
        unique: "users_email_unique",
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      mobile_no: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      profile_pic: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      brand_logo: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      password_resets_token: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "usersnew",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "users_email_unique",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );
};

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define("register", {
//     email: {
//       type: DataTypes.STRING,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//   });

//   return User;
// };
