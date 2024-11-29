module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      }
    });
    
    // initially had in a separate file but created circular dependency on User.belongsTo
    const UserStock = sequelize.define("user_stock", {
      stock_symbol: {
        type: Sequelize.STRING
      },
      stock_watched: {
        type: Sequelize.DATE
      }
    });
  
    UserStock.hasOne(User, {
      foreignKey: 'user_id',
    });
    
    User.belongsTo(UserStock)
  
    return { User, UserStock };
  };