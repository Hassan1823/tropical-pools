import React from "react";

const AdminComp = ({ user }) => {
  return (
    <div className="w-full min-h-[70vh] h-auto">
      Admin Role is : {user?.role}
    </div>
  );
};

export default AdminComp;
