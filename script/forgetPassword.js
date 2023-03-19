let targetUserObj = [];

const findUserIdToChangePassword = () => {
    const userIdField = getELement("userIdField").value;
  getELement("userIdField").value = '';
  
    // take all ticket
  const allUsers = getLocalStorageValue("registationInfo");
  // find the targetUser is available 
    const targetUser = allUsers.find(
		user => Object.keys(user)[0] === userIdField);
    targetUserObj = [targetUser];
    if (!targetUser) {
        alert(`Sorry We dont find "${userIdField}" account`)
    } else {
        const newPasswordSection = getELement("newPasswordSection");
		newPasswordSection.classList.remove("hidden");
    }
    
}

const changePassword = () => {
  const typeYesToConformPassword = getELement("typeYesToConformPassword").value;
  const typeConformPassword = getELement("typeConformPassword").value;
  const typePassword = getELement("typePassword").value;

  if (typeYesToConformPassword === 'Yes' || typeYesToConformPassword === "Y") {
    console.log(typeConformPassword);
    console.log(typePassword);

    if (typePassword === typeConformPassword) {
      
      const userKey = Object.keys(targetUserObj[0])[0];
      targetUserObj[0][`${userKey}`]["userPassword"] = typeConformPassword;

      // all tickets 
      const allUsers = getLocalStorageValue("registationInfo");

      // filter rest user array
      let restArray = allUsers.filter(
			user => Object.keys(user)[0] != userKey
      );
     
      restArray = [...restArray, targetUserObj[0]];
      
      setLocalStorageValue("registationInfo", restArray);
      
      location.replace('../index.html')
    } else {
      alert(`Password doesn't match`)
    }

  } else {
    alert('Wrong Value')
  }
  
}
