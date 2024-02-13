import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormSuccess = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="flex items-center p-3 text-sm rounded-md bg-emerald-500/15 gap-x-2 text-emerald-500">
      <ExclamationTriangleIcon className="w-4 h-4" />
      <p className="">{message}</p>
    </div>
  );
};

export default FormSuccess;
