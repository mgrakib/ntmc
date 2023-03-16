let userArray;
let getUserInfo;
const localStorageValue = getLocalStorageValue("registationInfo");
const userDashboardName = getELement("userDashboardName");
const setValue = (value) => {
    userArray = value;
    setLocalStorageValue("userInfo", userArray);
    
}

const show = () => {
    
    
    
}



const getUserData = () => {
    getUserInfo = getLocalStorageValue("userInfo");
    if (getUserInfo) {
        const key = Object?.keys(getUserInfo[0])[0];
        const userDashboardName = getELement("userDashboardName");
		userDashboardName.innerText = getUserInfo[0][key].userFullName;

    }
    // console.log(getUserInfo[0][key].userFullName);
    
    
}