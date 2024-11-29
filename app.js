// Простой сервер для чата в реальном времени
import express from "express";
import { Server } from "socket.io"; // позволяет работать с веб-сокетами для реализации реального времени
import http from "http"; // стандартаная библиотека Node.js, используется для создания  HTTP-сервера, который необходим для Socket.IO

const app = express(); // сщздакм экземпляр приложения Express
const port = process.env.PORT || 3333; // указываем порт, на котором будет работать сервер
const server = http.createServer(app); //создаем HTTP-сервер, который будет работать совместно с Express. Это необходимо, т.к. Socket.IO требует "низкоуровневого" сервера
const io = new Server(server); // инициализируем Socket.IO на базе созданого сервера

app.use(express.static("public")); //настраивает сервер для раздачи статических файлов из папки public (например: HTML, CSS, JS для фронтенда). Это нужно, чтобы фронтенд, который использует сокеты, был доступен через сервер
// app.use(express.json());
//обработка событий
io.on("connection", (socket) => {
  console.log("A user connected"); //io.on("connection") отслеживает новое подключение клиента к серверу. Вызывается каждый раз, когда пользователь подключается через веб-сокет. socket - объект, представляющий конкреное подключение клиента.

  //socket.on("chat message", callback): сервер ожидает события chat message от клиента. Это событие передает сообщение в чате. msg - сообщение, полученное от клиента
  socket.on("chat message", (msg) => {
    // io.emit("chat message", msg): рассылает сообщение всем подключенным пользователям (включая отправителя)
    io.emit("chat message", msg);
  });
  //socket.on("disconnect"): срабатывает, когда пользователь отключается от сервера. Выводит в консоль сообщение о разрыве соединения
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
//сервер начинает прослушивание указанного порта
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
