export const findRoleInUser = (roleCodes, userRoles) => {
  let haveRole = false;

  if (!roleCodes || !userRoles) {
    return false;
  }

  if (Array.isArray(roleCodes))
    roleCodes.forEach((roleCode) => {
      const hasRole = userRoles.find(
        (userRoleData) => userRoleData.role?.code === roleCode,
      );

      if (hasRole) {
        haveRole = true;
      }
    });
  return haveRole;
};
