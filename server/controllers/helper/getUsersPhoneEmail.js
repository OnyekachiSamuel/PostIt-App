import User from '../../models/user';
import UsersGroup from '../../models/usersgroup';

/** This method is used to get the email and
 * phone numbers of members in a group
 * @param {*} groupId
 * @param {func} done
  * @return {obj} Returns object of array of phone
 * contacts and email of users in a group
 */
const getUsersPhoneEmail = (groupId, done) => {
  const usersIds = [], phoneNumbers = [], emails = [];
  UsersGroup.findAll({ attributes: { exclude: ['groupId'] }, where: { groupId } })
   .then((users) => {
     users.forEach((data) => {
       usersIds.push(data.userId);
     });
     User.findAll({ attributes: ['phone', 'email'], where: { id: usersIds } })
     .then((usersDetails) => {
       usersDetails.forEach((user) => {
         phoneNumbers.push(user.dataValues.phone);
         emails.push(user.dataValues.email);
       });
       const result = { phoneNumbers, emails };
       done(result);
     });
   });
};

export default getUsersPhoneEmail;
