module.exports = (sequelize, Seq) => {
    return sequelize.define('userSave', {
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
        ideaId: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        target: {
            type: Seq.INTEGER,
            allowNull: false,
        },
    });
}
