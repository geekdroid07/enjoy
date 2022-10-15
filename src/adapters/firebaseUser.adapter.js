const firebaseUser = (user, info) => ({
  name: user.displayName,
  email: user.email,
  uid: user.uid
});

export default firebaseUser;
