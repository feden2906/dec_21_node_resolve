module.exports = {
  PASSWORD_REGEX: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/,
  EMAIL_REGEX: /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+)$/,
  PHONE_REGEX: /\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?/,

  AUTHORIZATION: 'Authorization',

  IMAGE_MAX_SIZE: 3 * 1024 * 1024, // 3MB

  IMAGE_MIMETYPES: [
      'image/gif',
      'image/jpeg',
      'image/png'
  ],
};

