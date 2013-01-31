module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Page', {
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        keywords: DataTypes.STRING,
        description: DataTypes.STRING,
        content: DataTypes.TEXT,
        alias: DataTypes.STRING
    });
};
