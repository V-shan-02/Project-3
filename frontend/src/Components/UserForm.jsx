export default function UserForm({
  handleOnSubmit,
  handleOnChange,
  formData,
  postResponse,
  btnText,
}) {
  return (
    <div className="userLogin">
      <form onSubmit={handleOnSubmit}>
        <div>
          <p>
            {" "}
            Username:
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleOnChange}
            />
          </p>
        </div>
        <div>
          <p>
            Password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleOnChange}
            />
          </p>
        </div>

        <br />
        <button>{btnText}</button>
      </form>
      <br />
      {postResponse}
    </div>
  );
}
