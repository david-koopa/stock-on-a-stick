module.exports = (sequelize, Sequelize) => {  
    const Watchlist = sequelize.define("watchlist", {
      stock_symbol: {
        type: Sequelize.STRING
      },
      stock_watched: {
        type: Sequelize.DATE
      }
    });
    return { Watchlist };
  };