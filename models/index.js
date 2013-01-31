var config = require('../config'),
    Sequelize = require('sequelize');

var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect: config.db.type,
    host: config.db.host,
    port: config.db.port,
    omitNull: true,
    define: {
        engine: 'MYISAM',
        paranoid: true,
        underscored: true
    }
});

var Tag = exports.Tag = sequelize.import(__dirname + '/tag');
var Group = exports.Group = sequelize.import(__dirname + '/group');
var Topic = exports.Topic = sequelize.import(__dirname + '/topic');
var Post = exports.Post = sequelize.import(__dirname + '/post');
var User = exports.User = sequelize.import(__dirname + '/user');
var Page = exports.Page = sequelize.import(__dirname + '/page');

Tag.hasMany(Group);
Group.belongsTo(Tag);
Group.hasMany(Topic);
Topic.belongsTo(Group);
Topic.belongsTo(User);
Post.belongsTo(Topic);
Post.belongsTo(User);

sequelize.sync();
