import { useState } from "react";

import styles from "./EditProfile.module.css";

import { updateProfile } from "../../../services/user.service";

function EditProfile({ profile, setProfile, closeModal }) {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    bio: profile.bio || "",
    skills: profile.skills || [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(formData);

      setProfile(response.data);

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Bio</label>

          <textarea name="bio" value={formData.bio} onChange={handleChange} />

          <label>Skills</label>

          <input
            name="skills"
            value={formData.skills.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value.split(","),
              })
            }
          />

          <button>Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
