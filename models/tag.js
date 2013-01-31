module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Tag', {
        id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        ordering: DataTypes.INTEGER
    });
};
