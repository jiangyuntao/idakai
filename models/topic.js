module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Topic', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        viewed: DataTypes.INTEGER,
        replied: DataTypes.INTEGER
    });
};
