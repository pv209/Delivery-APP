/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @return
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { tableName: 'users', timestamps: false }
  );
  User.associate = ( { Sale } ) => {
    User.hasMany(Sale, {foreignKey: 'user_id' });
    User.hasMany(Sale, { foreignKey: 'seller_id'});
  };
  return User;
};
