// getElementById
const getELement = (id) => {
    const element = document.getElementById(id);
    return element;
}


// registationSubmit function
const registationSubmit = () => {
    // get value from input 
    const registatonFullName = getELement("registatonFullName").value;
    const registatonUserName = getELement("registatonUserName").value;
    const registatonPassword = getELement("registatonPassword").value;

    // make an object by input value 
    const registationInfo = { registatonFullName, registatonUserName, registatonPassword }
    
    // get localstorage value 
    const localStorageValue = JSON.parse(localStorage.getItem('registationInfo'));


    if (localStorageValue) {

        // check input user name is exist in previous localStorageValue
        let isExist = localStorageValue.find(
            ans => ans.registatonUserName == registatonUserName
        );

         // if exist code stope here 
        if (isExist) {
            alert('alreay have');
            return;
        }
            
        localStorage.setItem(
			"registationInfo",
			JSON.stringify([...localStorageValue, registationInfo])
		);
            
    } else {
        localStorage.setItem(
			"registationInfo",
			JSON.stringify([registationInfo])
		);
    }

    
}