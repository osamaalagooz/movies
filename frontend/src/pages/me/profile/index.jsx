import React, { useState, useEffect } from "react";
import "./index.scss";
import useAuth from "../../../hooks/useAuth";
import { updateUserData, updateUserPassword } from "../../../api/user";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  const [initialData, setInitialData] = useState({});
  const [formPassword, setFormPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        gender: user.gender || "",
      };
      setFormData(userData);
      setInitialData(userData);
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangePassword = (e) => {
    const { id, value } = e.target;
    setFormPassword((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleToggleEdit = () => {
    setIsEditing((prevState) => !prevState);
    setIsChangingPass(false);
  };

  const handleToggleEditPassword = () => {
    setIsChangingPass((prevState) => !prevState);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData(initialData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedData = {};
    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        changedData[key] = formData[key];
      }
    }

    const mappedData = {
      first_name: changedData.firstName,
      last_name: changedData.lastName,
      email: changedData.email,
    };

    const filteredData = Object.fromEntries(
      Object.entries(mappedData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredData).length === 0) {
      console.log("No changes detected, skipping update.");
      setIsEditing(false);
      return;
    }

    try {
      const res = await updateUserData(filteredData);
      if (res?.user) {
        setUser({
          ...user,
          ...res.user,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!formPassword.oldPassword) {
      errors.oldPassword = "Old password is required.";
    }
    if (!formPassword.newPassword) {
      errors.newPassword = "New password is required.";
    } else if (formPassword.newPassword !== formPassword.confirmNewPassword) {
      errors.confirmNewPassword = "Passwords do not match.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (validatePasswordForm()) {
        await updateUserPassword({
          old_password: formPassword.oldPassword,
          new_password: formPassword.newPassword,
        });

        setFormPassword({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setIsChangingPass(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile_container">
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          <div className="grid-item full-width">
            <h3>Profile</h3>
          </div>
          <div className="grid-item half-width">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>
          <div className="grid-item half-width">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
          <div className="grid-item half-width">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="grid-item half-width">
            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" value={formData.gender} readOnly />
          </div>
          <div className="grid-item full-width">
            {isEditing ? (
              <>
                <button type="submit">Update Profile</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="button" onClick={handleToggleEdit}>
                Edit Profile
              </button>
            )}
            <button
              type="button"
              className={
                !isChangingPass ? "change-password-button" : "cancel-button"
              }
              style={{ marginTop: "30px" }}
              onClick={handleToggleEditPassword}
              disabled={isEditing}
            >
              {isChangingPass ? "Cancel Changing Password" : "Change Password"}
            </button>
          </div>
        </div>
      </form>

      {isChangingPass && (
        <form onSubmit={handleUpdatePassword}>
          <div className="grid-container">
            <div className="grid-item half-width">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={formPassword.oldPassword}
                onChange={handleChangePassword}
              />
              {errors.oldPassword && (
                <span className="error-message">{errors.oldPassword}</span>
              )}
            </div>
            <div className="grid-item half-width">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={formPassword.newPassword}
                onChange={handleChangePassword}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>
            <div className="grid-item half-width">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={formPassword.confirmNewPassword}
                onChange={handleChangePassword}
              />
              {errors.confirmNewPassword && (
                <span className="error-message">
                  {errors.confirmNewPassword}
                </span>
              )}
            </div>
            <div className="grid-item full-width">
              <button type="submit" style={{ marginTop: "30px" }}>
                Update Password
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
