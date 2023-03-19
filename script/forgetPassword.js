const findUserIdToChangePassword = () => {
    const userIdField = getELement("userIdField").value;
    getELement("userIdField").value = '';
    const allTickets = getLocalStorageValue("registationInfo");
    const targetUser = allTickets.find(
		user => Object.keys(user)[0] === userIdField);
    
    if (!targetUser) {
        alert(`Sorry We dont find "${userIdField}" account`)
    } else {
        console.log(targetUser);
        
        
    }
    
}

