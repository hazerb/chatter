module.exports = (sequelize, Seq) => {
    return sequelize.define('sharedTopic', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        topic:{
            type: Seq.STRING,
            allowNull: false,
        },
        count:{
            type: Seq.INTEGER,
            allowNull: false,
        },
    },{   
        timestamps : false
    });
}
