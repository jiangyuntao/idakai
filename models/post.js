module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Post', {
        id: DataTypes.INTEGER,
        content: DataTypes.TEXT
    });
};
