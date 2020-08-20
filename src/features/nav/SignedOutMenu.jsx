import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { OpenModal } from "../../app/common/modals/modalReducer";

export default function SignedOutMenu({setAuthenticated}) {
  const dispatch = useDispatch();
  return (
    <Menu.Item position='right'>
      <Button onClick={() => dispatch(OpenModal({modalType: 'LoginForm'}))} basic inverted content='Login' />
      <Button
        onClick={() => dispatch(OpenModal({modalType: 'RegisterForm'}))}
        basic
        inverted
        content='Register'
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
}
