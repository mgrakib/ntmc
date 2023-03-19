/** @format */


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
    const localStorageValue = getLocalStorageValue("registationInfo");

    // this variable contian current user info who login 
    let userInfo;
    
    if (localStorageValue) {
        userInfo = localStorageValue.find(
			user => Object.keys(user)[0] === loginUserName
		);
    } 
    
    if (userInfo) {
        document.getElementById("alartUserId").classList.add("hidden");

        if (userInfo[loginUserName]?.userPassword != loginPassword) {

            document
				.getElementById("alartUserPassword")
				.classList.remove("hidden");
                
        } else {
             document
					.getElementById("alartUserPassword")
					.classList.add("hidden");
            location.href = '../dashboard.html'
            
            setValue(userInfo); 
        }
        
            
    } else {
        document.getElementById("alartUserId").classList.remove('hidden');
    }
        
    
}

const goToSingUp = () => {
    location.href =  '../singup.html'  
}

const goToForgetPassword = () => {
    location.href = "../forgetPassword.html";
}

let showPass = false;
const showPassword = ()=>{
    const eyeBtn = getELement('eyeBtn');
    const loginPassword = getELement('loginPassword');

    if (!showPass) {
        showPass = true;
        eyeBtn.classList.remove('fa-eye-slash')
        eyeBtn.classList.add('fa-eye');
        loginPassword.type = 'text';
    } else {
        showPass = false;
		eyeBtn.classList.add("fa-eye-slash");
        eyeBtn.classList.remove("fa-eye");
        loginPassword.type = "password";
    }
    
}