module.exports.registerErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("email")) {
    if (err.errors.email.kind = "unique"){
      errors.email = "Cet email est déjà enregistré";
    } else {
      errors.email = "Email incorrect";
    }
  }

  if (err.message.includes("username")) {
    if (err.errors.username.kind = "unique"){
      errors.username = "Cet username est déjà pris";
    } else {
      errors.username = "Username incorrect";
    }
  }

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";



  return errors;
};

module.exports.loginErrors = (err) => {
  let errors = { email: '', password: ''}

  if (err.message.includes("email")) 
    errors.email = "Email inconnu";
  
  if (err.message.includes('password'))
    errors.password = "Le mot de passe ne correspond pas"

  return errors;
}