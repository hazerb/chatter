module.exports = (sequelize, Seq) => {
    return sequelize.define('idea', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        owner: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        topic:{
            type: Seq.STRING,
            allowNull: false,
        },
        title: {
            type: Seq.STRING,
            allowNull: false,
        },
        content: {
        	type: Seq.STRING,
            allowNull: false,
        },
        publishable: {
        	type: Seq.TINYINT,
            allowNull: false,
        },
        likeCount: Seq.INTEGER,
        dislikeCount: Seq.INTEGER,
        commentCount: Seq.INTEGER
    }, 
    {   
        timestamps : true
    }
    )
}
