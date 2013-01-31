module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        avatar: DataTypes.STRING,
        posts: DataTypes.INTEGER
    });
};
