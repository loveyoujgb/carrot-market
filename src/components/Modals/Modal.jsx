import React from "react";
import "./Modal.css";

const Modal = (props) => {
  const { open, close } = props;
  console.log(props);

  return (
    <div className={open ? "openModal modalstyle" : "modalstyle"}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
