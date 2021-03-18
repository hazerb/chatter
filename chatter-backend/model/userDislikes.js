module.exports = (sequelize, Seq) => {
    return sequelize.define('userDislike', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        userId: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        ideaId:{
            type: Seq.INTEGER,
            allowNull: false,
        },
    });
}
