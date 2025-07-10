import React, { Fragment } from "react";
import { SheetClose } from "../ui/sheet";

const SheetCloseWrapper = ({ children, closeOnClick }) => {
  return (
    <>
      {closeOnClick ? (
        <SheetClose asChild>{children}</SheetClose>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </>
  );
};

export default SheetCloseWrapper;
