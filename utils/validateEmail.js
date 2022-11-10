module.exports = {
  validateEmail: (email) => {
    const re = /^.+@(?:[\w-]+\.)+\w+$/;
    return re.test(email)        
  }
}