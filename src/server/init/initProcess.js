//
// init proceess
//

module.exports = (appOptions = {}) => {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception: ', err);
  });
  
  process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
  });
};
  
