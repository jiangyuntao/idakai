module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Group', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        alias: DataTypes.STRING,
        avatar: DataTypes.STRING,
        topics: DataTypes.INTEGER,
        ordering: DataTypes.INTEGER,
        closed: DataTypes.BOOLEAN,
        closed_reason: DataTypes.STRING
    });
};
