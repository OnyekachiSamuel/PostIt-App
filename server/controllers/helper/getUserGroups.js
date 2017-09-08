import Group from '../../models/group';
import UsersGroup from '../../models/usersgroup';

export const getUserGroups = (userId, done) => {
  const groupIds = [], groupDetails = [];
  UsersGroup.findAll({ attributes: ['groupId'], where: { userId } })
   .then((groups) => {
     groups.forEach((data) => {
       groupIds.push(data.groupId);
     });
     Group.findAll({ attributes: ['id'], where: { id: groupIds } })
     .then((groupData) => {
       groupData.forEach((data) => {
         groupDetails.push(data.dataValues.id);
       });
       const result = { groupDetails };
       return done(result);
     });
   });
};