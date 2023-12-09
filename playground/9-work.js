function formatPhone(phoneNr) {
    const numericPhoneNr = phoneNr.replace(/^\+4|\D/g, "");
  
    return numericPhoneNr;
  }

console.log(formatPhone('+40 774 688 755'));