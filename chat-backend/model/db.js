const Sequelize = require('sequelize')
//Project models
const UserModel = require('./users')
const IdeaModel = require('./ideas')
const LikeModel = require('./userLikes')
const DislikeModel = require('./userDislikes')
const SaveModel = require('./userSaves')
const CommentModel = require('./comments')
const SharedTopicModel = require('./sharedTopics')
const NotificationModel = require('./notifications')

//User models:



//Connection to server database
const sequelize = new Sequelize('chatter', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})


const User = UserModel(sequelize, Sequelize)
const Idea = IdeaModel(sequelize, Sequelize)
const Like = LikeModel(sequelize, Sequelize)
const Dislike = DislikeModel(sequelize, Sequelize)
const Save = SaveModel(sequelize, Sequelize)
const Comment = CommentModel(sequelize, Sequelize)
const SharedTopic = SharedTopicModel(sequelize, Sequelize)
const Notification = NotificationModel(sequelize, Sequelize)


Comment.belongsTo(User, {foreignKey : 'commenterId', constraints: false})
Save.belongsTo(Idea, {as: "idea", foreignKey: 'ideaId', constraints: false})
Like.belongsTo(Idea, {as: "idea", foreignKey: 'ideaId', constraints: false})
Notification.belongsTo(User, {foreignKey: 'actor', constraints: false})
Notification.belongsTo(Idea, {foreignKey: 'subject', constraints: false})
Idea.belongsTo(User, {foreignKey: 'owner', constraints: "false"})
Save.belongsTo(User, {as: "user", foreignKey: 'target', constraints: "false"})
Like.belongsTo(User, {as: "user", foreignKey: 'target', constraints: "false"})

sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
    return sequelize.sync({ force: false });
})
.then(function(){
    return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
})
.then(function(){
    console.log('Database & tables are created.');
}, function(err){
    console.log(err);
});


module.exports = {
  User,
  Idea,
  Like,
  Dislike,
  Save,
  Comment,
  SharedTopic,
  Notification
}
