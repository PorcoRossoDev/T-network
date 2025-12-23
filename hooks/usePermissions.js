import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook để sử dụng permissions
 */
export const usePermissions = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("usePermissions must be used within an AuthProvider");
  }

  const {
    permissions,
    permissionsLoaded,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getModulePermissions,
  } = context;

  return {
    permissions,
    permissionsLoaded,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    getModulePermissions,
  };
};

export default usePermissions;
