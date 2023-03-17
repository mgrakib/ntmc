

// registationSubmit function
const registationSubmit = () => {
	// get value from input
	const registatonFullName = getELement("registatonFullName").value;
	const registatonUserName = getELement("registatonUserName").value;
	const registatonPassword = getELement("registatonPassword").value;

	if (!registatonFullName || !registatonUserName || !registatonPassword) {
		alert("you cant pass empty value");
		return;
	}

	getELement("registatonFullName").value = '';
	getELement("registatonUserName").value = '';
	getELement("registatonPassword").value = '';
	
	

	const registationInfo = {
		[registatonUserName]: {
			userFullName: registatonFullName,
			userPassword: registatonPassword,
		},
	};

	// get localstorage value
	const localStorageValue = getLocalStorageValue("registationInfo");

	if (localStorageValue) {
		// check input user name is exist in previous localStorageValue
		let isExist = localStorageValue.find(ans => Object.keys(ans)[0] == registatonUserName);

		console.log(isExist);
		
		// if exist code stope here
		if (isExist) {
			alert("alreay have");
			return;
		}
		setLocalStorageValue("registationInfo", [
			...localStorageValue,
			registationInfo,
		]);
		// localStorage.setItem(
		// 	"registationInfo",
		// 	JSON.stringify([...localStorageValue, registationInfo])
		// );
	} else {		
		setLocalStorageValue("registationInfo", [registationInfo]);
	}

	const successfullAlart = getELement("successfullAlart");
	successfullAlart.classList.remove('hidden');
	successfullAlart.classList.add('flex');
	
	setTimeout(function () {
		successfullAlart.classList.add("hidden");
		successfullAlart.classList.remove("flex");
	}, 3000);
	
	// get localstorage value
	const localStorageValueToLogin = getLocalStorageValue("registationInfo");
	registationInfoArray = [...localStorageValueToLogin];
}


const goToSingIn = () => {
	location.href = '../login.html'
}