/** @format */

// getElementById
const getELement = id => {
	const element = document.getElementById(id);
	return element;
};

const agreeInputCheckBox = () => {
	const agreeInputCheckBox = getELement("agreeInputCheckBox");
	const loginBtnDiv = getELement("loginBtnDiv");

	if (agreeInputCheckBox.checked === true) {
		loginBtnDiv.classList.remove("hidden");
	} else {
		loginBtnDiv.classList.add("hidden");
	}
};

const loginFuncation = () => {
    // get input value 
	const loginUserName = getELement("loginUserName").value;
	const loginPassword = getELement("loginPassword").value;
    
    // set input value blank 
    getELement("loginUserName").value = '';
    getELement("loginPassword").value = '';
	
    // get localstorage value
	const localStorageValue = JSON.parse(
		localStorage.getItem("registationInfo")
    );
   
    const userInfo = localStorageValue.find(
		user => Object.keys(user)[0] === loginUserName
	);
    

    if (userInfo) {
        document.getElementById("alartUserId").classList.add("hidden");

        if (userInfo[loginUserName].userPassword != loginPassword) {

            document
				.getElementById("alartUserPassword")
				.classList.remove("hidden");
                
        } else {
             document
					.getElementById("alartUserPassword")
					.classList.add("hidden");
            console.log('login successfull');
            
        }
        
            
    } else {
        document.getElementById("alartUserId").classList.remove('hidden');
    }
    
    
    
    
    
    
}

const goToSingUp = () => {
    location.href =  '../singup.html'
    
}