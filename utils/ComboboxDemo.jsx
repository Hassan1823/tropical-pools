"use client";

import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";
import { CiCircleChevDown } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChangeOrderStatusMutation } from "@/redux/features/products/productApi";
import { toast } from "sonner";

const frameworks = [
  {
    value: "processing",
    label: "processing",
  },
  {
    value: "shipped",
    label: "shipped",
  },
  {
    value: "delivered",
    label: "delivered",
  },
];

export function ComboboxDemo({ currValue, orderID }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // * change the order status starts here
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    didMountRef.current = true;
  }, []);

  const [changeOrderStatus, { data, isSuccess, error, isLoading }] =
    useChangeOrderStatusMutation();

  React.useEffect(() => {
    if (!didMountRef.current || currValue === value) return; // Skip first render and subsequent re-renders due to same values
    changeOrderStatus({ status: value, orderId: orderID });
  }, [value]);

  React.useEffect(() => {
    if (didMountRef.current && isSuccess) {
      // toast.success(data.message);
      console.log(data.message);
    }
    if (didMountRef.current && error) {
      if ("data" in error) {
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    }
  }, [isSuccess, error]);

  // * change the order status ends here

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={isLoading}
          aria-expanded={open}
          className="w-auto gap-2 justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : currValue}
          <CiCircleChevDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandInput placeholder="Search status ..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <FaCheck
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
