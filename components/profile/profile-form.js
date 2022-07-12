import classes from "./profile-form.module.css";
import { useRef } from "react";

function ProfileForm(props) {
  const oldInputRef = useRef();
  const newInputRef = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const enteredNewPassword = newInputRef.current.value;
    const enteredOldPassword = oldInputRef.current.value;

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
