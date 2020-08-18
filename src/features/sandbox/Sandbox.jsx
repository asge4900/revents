import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { decrement, increment } from "./testReducer";
import { OpenModal } from "../../app/common/modals/modalReducer";

export default function Sandbox() {
  const dispath = useDispatch();
  const data = useSelector((state) => state.test.data);

  return (
    <>
      <h1>Testing 123</h1>
      <h3>The data is: {data} </h3>
      <Button
        onClick={() => dispath(increment(20))}
        content='Increment'
        color='green'
      />
      <Button
        onClick={() => dispath(decrement(10))}
        content='Decrement'
        color='red'
      />
      <Button
        onClick={() =>
          dispath(OpenModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content='Open Modal'
        color='teal'
      />
    </>
  );
}
