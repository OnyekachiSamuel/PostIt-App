import User from '../../models/user';
import UsersGroup from '../../models/usersgroup';

export const getUsersPhoneEmail = (groupId, done) => {
  const usersIds = [], phoneNumbers = [], emails = [];
  UsersGroup.findAll({ attributes: { exclude: ['groupId'] }, where: { groupId } })
   .then((users) => {
     users.forEach((data) => {
       usersIds.push(data.userId);
     });
     User.findAll({ attributes: ['phone', 'email'], where: { id: usersIds } })
     .then((usersDetails) => {
       usersDetails.forEach((data) => {
         phoneNumbers.push(data.dataValues.phone);
         emails.push(data.dataValues.email);
       });
       const result = { phoneNumbers, emails };
       done(result);
     });
   });
};
