import React from "react";
import { XEM_THU_GUI_DEN } from "./const/RSASenderConst";
import { XEM_THU_GUI_DEN_RECEIVER } from "./const/RSAReceiverConst";
const initialState = {
  Component: <p>Kien Pro</p>,
  title: "",
};

export const ModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case XEM_THU_GUI_DEN: {
        return {...state, Component: action.Component, title: "Khóa công khai gửi đến"}
    }
    case XEM_THU_GUI_DEN_RECEIVER: {
      return {...state, Component: action.Component, title: "Tin nhắn hóa hóa gửi đến"}
    }
    default:
      return { ...state };
  }
};
