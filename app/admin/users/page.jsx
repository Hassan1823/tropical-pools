"use client";

import Loader from "@/app/components/Loader";
import {
  useAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/api/apiSlice";
import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const frameworks = [
  {
    value: "user",
    label: "user",
  },
  {
    value: "admin",
    label: "admin",
  },
];

const UsersPage = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const { data, isLoading, error, refetch } = useAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  React.useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    }
  }, [error]);

  // * change the user role starts here
  const [
    updateUserRole,
    { data: roleData, error: roleError, isSuccess: roleSuccess },
  ] = useUpdateUserRoleMutation();

  const handleUserRole = async (userId) => {
    await updateUserRole({ userId: userId, role: value });
  };

  React.useEffect(() => {
    if (roleSuccess) {
      refetch();
      toast.success(roleData.message);
    }
    if (roleError) {
      if ("data" in roleError) {
        const errorMessage = roleError.data.message;
        toast.error(errorMessage);
      }
    }
  }, [roleSuccess, roleError]);
  // * change the user role ends here
  return (
    <div className="w-full min-h-[80vh] h-auto flex flex-col justify-start items-center space-y-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-auto p-4">
          {data ? (
            <>
              <h1 className="w-full text-center text-2xl font-semibold">
                Users
              </h1>
              {/* all users */}
              <div className="w-full h-auto lg:px-8 md:px-4 px-2 py-4 space-y-4">
                <div className="w-full h-auto flex flex-col justify-start items-center space-y-4 cursor-pointer border-4 rounded-md p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Id</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.users.map((item, idx) => {
                        return (
                          <TableRow
                            key={idx}
                            className="hover:bg-slate-200 hover:scale-101 duration-500"
                          >
                            <TableCell className="text-center">
                              {item._id}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.email}
                            </TableCell>

                            <TableCell className="text-center">
                              <select
                                name="role"
                                id=""
                                className="outline-none px-2 bg-transparent"
                                onChange={(e) => setValue(e.target.value)}
                              >
                                <option value={item.role} selected>
                                  {item.role}
                                </option>
                                <option
                                  value={
                                    item.role === "admin" ? "user" : "admin"
                                  }
                                  className="p-2"
                                >
                                  {item.role === "admin" ? "user" : "admin"}
                                </option>
                              </select>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="default"
                                size="icon"
                                className="bg-green-500 hover:bg-green-700"
                                onClick={() => handleUserRole(item._id)}
                              >
                                OK
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="w-full text-center text-2xl font-semibold">
                No Users Found
              </h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersPage;
