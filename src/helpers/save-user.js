const saveUser = (user) => {
  const usersPath = path.join(
    __dirname,
    "../../db/users/",
    `${user.username.toLowerCase()}.json`
  );
  fs.writeFile(usersPath, JSON.stringify(user), (error) => {
    if (error) throw error;
  });
};

module.exports = saveUser;
