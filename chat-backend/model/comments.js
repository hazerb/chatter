module.exports = (sequelize, Seq) => {
    return sequelize.define('comment', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        commenterId: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        ideaId:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        content: {
            type: Seq.STRING,
            allowNull: false,
 		}},
    	{   
        	timestamps : true
    	},
    );
}
