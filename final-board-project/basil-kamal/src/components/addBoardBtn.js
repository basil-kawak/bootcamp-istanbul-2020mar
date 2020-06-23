import React from "react";
import { Button } from "react-bootstrap";

const AddBoardBtn = (props) => {
  return (
    <div className="addboard">
      <Button variant="primary" onClick={props.SwitchModal} block>
        Add a Board
      </Button>
    </div>
  );
};
export default AddBoardBtn;
