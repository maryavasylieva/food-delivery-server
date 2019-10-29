const fs = require("fs");
const path = require("path");
const uuidv4 = require("uuid/v4");

const userPath = path.join(__dirname, "..", "db", "users", "all-users.json");

const userService = {
  getUser: (id) => {
    try {
      return new Promise((res, rej) => {
        fs.open(userPath, "r", (err, fd) => {
          fs.readFile(fd, "utf-8", (err, data) => {
            if (err) rej(err);
            const getUserArr = data ? JSON.parse(data) : [];
            const user = getUserArr.filter((user) => user.id === id);

            res(user ? { status: "success", user } : { status: "no user" });
          });
        });
      });
    } catch (e) {
      throw new Error("Something went wrong when get user:", e);
    }
  },

  postUser: (user) => {
    try {
      return new Promise((res, rej) => {
        fs.readFile(userPath, "utf8", (err, data) => {
          const usersArr = data ? JSON.parse(data) : [];
          usersArr.push({ id: uuidv4(), ...user });

          fs.writeFile(userPath, JSON.stringify(usersArr), (err) => {
            if (err) rej(err);

            res({ status: "success", user: usersArr[usersArr.length - 1] });
          });
        });
      });
    } catch (e) {
      throw new Error("Error while creating user: ", e);
    }
  }
};

module.exports = {
  userPath,
  userService
};
