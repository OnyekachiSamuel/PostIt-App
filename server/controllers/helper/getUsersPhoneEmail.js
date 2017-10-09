import User from '../../models/user';
import UsersGroup from '../../models/usersgroup';

/**
 * @return {obj} Returns object of array of phone contacts and email of users in a group
 * @param {*} groupId
 * @param {func} done
 */
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
