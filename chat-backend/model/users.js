module.exports = (sequelize, Seq) => {
    return sequelize.define('user', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        name: {
            type: Seq.STRING,
            allowNull: false,
        },
        surname:{
            type: Seq.STRING,
            allowNull: false,
        },
        email: {
            type: Seq.STRING,
            allowNull: false,
            unique: true,
        },
        instagram: Seq.STRING,
        age: Seq.STRING,
        popularity: Seq.INTEGER,
        ideaCount: Seq.INTEGER,
        password: {
            type: Seq.STRING,
            allowNull: false,
        },
        validation: Seq.STRING,
        isValidated: Seq.BOOLEAN
    }, 
    {   
        timestamps : true
    }
    )
}
