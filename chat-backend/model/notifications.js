module.exports = (sequelize, Seq) => {
    return sequelize.define('notification', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        actor:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        action:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        target:{
            type: Seq.INTEGER,
            allowNull: false,
        },
        subject:{
            type: Seq.INTEGER,
            allowNull: false,
        },
    },{   
        timestamps : true
    });
}
