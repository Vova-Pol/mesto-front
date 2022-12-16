function AuthForm(props) {
  return (
    <form className="auth" onSubmit={props.handleSubmit}>
      <h1 className="auth__title">{props.formName}</h1>
      <input
        className="auth__input"
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={props.handleChange}
        value={props.inputsValues.email}
      ></input>
      <input
        className="auth__input"
        type="password"
        name="password"
        placeholder="Пароль"
        required
        minLength="2"
        maxLength="40"
        onChange={props.handleChange}
        value={props.inputsValues.password}
      ></input>
      <button type="submit" className="auth__submit-button">
        {props.submitButtonName}
      </button>
    </form>
  );
}

export default AuthForm;
