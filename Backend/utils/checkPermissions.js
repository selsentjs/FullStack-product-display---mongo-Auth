const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  // current user details
   console.log("requestUser", requestUser); //name: 'Selvi', userId: '67445cb7b80c130ec6f8c6fe', role: 'admin'
   console.log("resourceUserId:", resourceUserId);//  67445c98b80c130ec6f8c6fb
   console.log("typeof resourceUserId:", typeof resourceUserId);// object

  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;