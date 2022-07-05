module.exports = {
  userPresenter: (user) => {
    return {
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      age: user.age,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  },
};
