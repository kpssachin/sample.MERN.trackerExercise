import { useState } from "react";
import axios from "axios";

export default function CreateUser(props) {
  const [username, setUsername] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    const user = {
      username,
    };
    console.log(
      "🚀 ~ file: create-user.component.js ~ line 18 ~ onSubmit ~ user",
      user,
    );

    axios.post(process.env.REACT_APP_ADD_USER_ENDPOINT, user)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    setUsername("");
  }

  return (
    <div>
      <h2>Create New Exercise Log</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Write"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create user
        </button>
      </form>
    </div>
  );
}
