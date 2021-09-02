export default (phone) => {
  const phoneParts = /^[78]?(\d{3})(\d{3})(\d{2})(\d{2})$/.exec(phone);
  console.log(phoneParts);

  return phoneParts
    ? `+7 (${phoneParts[1]}) ${phoneParts[2]}-${phoneParts[3]}-${phoneParts[4]}` : phone;
};
