const registeredUsers = [
  { username: "Alex", password: "Password1" },
  { username: "Bob", password: "Password2" },
  { username: "Carl", password: "Password3" },
];

//
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const successMessage = document.getElementById("success-message");
const welcomeMessage = document.getElementById("welcome-message");
const welcomeUsername = document.getElementById("welcome-username");

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

//
document.getElementById("register-button").addEventListener("click", () => {
  // Очистка предыдущих ошибок
  usernameError.textContent = "";
  passwordError.textContent = "";
  confirmPasswordError.textContent = "";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  try {
    // Валидация логина
    if (!validateUsername(username)) {
      throw new Error(
        "Логин должен содержать только буквы и цифры, и быть длиной от 3 до 20 символов."
      );
    }

    // Валидация пароля
    if (!validatePassword(password)) {
      throw new Error(
        "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы + цифры."
      );
    }

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      throw new Error("Пароли должны совпадать");
    }

    // Проверка на существующего пользователя
    let existingUser = false; // Пользователь существует И пароль правильный
    let userExists = false; // Пользователь существует (любой пароль)

    for (let i = 0; i < registeredUsers.length; i++) {
      if (
        registeredUsers[i].username === username &&
        registeredUsers[i].password === password
      ) {
        existingUser = true;
      }

      if (registeredUsers[i].username === username) {
        userExists = true;
      }
    }

    if (userExists && !existingUser) {
      throw new Error("Пользователь с таким именем уже существует.");
    }

    if (existingUser) {
      // Существующий пользователь
      welcomeUsername.textContent = username;
      welcomeMessage.style.display = "block";
      successMessage.style.display = "none";
    } else {
      // Новый пользователь регистрация
      registeredUsers.push({ username, password }); // сохраняем пользователя
      successMessage.style.display = "block";
      welcomeMessage.style.display = "none";

      // логи после успешной регистрации
      console.log("Зарегистрирован новый пользователь:", username);
      console.log("Все пользователи:", registeredUsers);
    }
  } catch (error) {
    // Обработка ошибок
    if (
      error.message.includes("Логин") ||
      error.message.includes("существует")
    ) {
      usernameError.textContent = error.message;
    } else if (
      error.message.includes("Пароль") &&
      !error.message.includes("совпадать")
    ) {
      passwordError.textContent = error.message;
    } else if (error.message.includes("совпадать")) {
      confirmPasswordError.textContent = error.message;
    }
  }
});
