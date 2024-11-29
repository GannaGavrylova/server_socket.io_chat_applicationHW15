const socket = io();
const form = document.querySelector("#form");
const input = document.querySelector("input");
const messages = document.querySelector("#messages");

let lastDisplayedDate = ""; // Переменная для отслеживания последней отображенной даты

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (input.value) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("ru-Ru"); // Получаем дату
    const formattedTime = currentDate.toLocaleTimeString("ru-Ru", {
      hour: "2-digit",
      minute: "2-digit",
    }); // Получаем время Формат: 11:36

    // const formattedDate = `${currentData.toLocaleDateString()} ${currentData.toLocaleTimeString()}`; // Форматируем дату и время
    // socket.emit("chat message", `${formattedDate} - ${input.value}`); // Отправляем дату и сообщение

    socket.emit("chat message", {
      date: formattedDate,
      time: formattedTime,
      text: input.value,
    });

    input.value = ""; // Очищаем поле ввода
  }
});
// Получаем сообщения с сервера и добавляем их в список
socket.on("chat message", (msg) => {
  const currentDate = msg.date;
  // Если дата изменилась (новый день), отображаем дату
  if (lastDisplayedDate !== currentDate) {
    lastDisplayedDate = currentDate;
    const dateItem = document.createElement("li");
    dateItem.textContent = currentDate; // Показываем дату
    dateItem.style.fontWeight = "bold"; // Делаем дату визуально отличимой
    dateItem.style.textAlign = "center"; // Выравниваем дату по центру
    messages.appendChild(dateItem);
  }
  // Всегда отображаем время и текст сообщения
  const item = document.createElement("li");
  item.textContent = `[${msg.time}] ${msg.text}`; // Показываем время и сообщение
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
