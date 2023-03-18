
let getUserInfo;

let openArray;
let answeredArray;
let inProgressArray;
let closeArray;

const localStorageValue = getLocalStorageValue("registationInfo");
const userDashboardName = getELement("userDashboardName");
const noDataMessage = getELement("noDataMessage");

// this function set current user info in localStorage call from login
const setValue = (value) => {
    setLocalStorageValue("userInfo", [value]);
}

// count total number of array 
const totalCount = (array, proparty, value) => {
	const totalCount = array.filter(ticket => ticket[proparty] === value);
	return totalCount;
};

// show total open ticket 
function showOpenNumber(openArray) {
    const newOpenTicketNum = getELement("newOpenTicketNum");
    const countOpenTicket = getELement("countOpenTicket");
    const highPriorityOpenTicketNum = getELement("highPriorityOpenTicketNum");

    // get toalheight priority array 
    const totalHeighPriority = totalCount(openArray, 'priority', 'High');
    
    
    countOpenTicket.innerText = openArray.length ? openArray.length : "0";
    newOpenTicketNum.innerText = openArray.length ? openArray.length : '0';
    highPriorityOpenTicketNum.innerText = totalHeighPriority.length
		? totalHeighPriority.length
		: "0";

}

// display all ticket in table
const displayTickets = () =>{
    const allTickets = getLocalStorageValue('ticket');
    if (allTickets) {
        noDataMessage.classList.add("hidden");
        const allTicketsTbody = getELement("allTicketsTbody");

        // set array to open array to show open ticket 
        openArray = allTickets.filter(ticket => ticket.status === 'Open');
        showOpenNumber(openArray);
        let count = 1;
        allTickets.forEach(ticket => {
            const {
                ticketIssueTime,
                ticketSubject,
                userName,
                userId,
                organizationName,
				projectName,
				priority,
				status,
				ticketDescription,
				
			} = ticket;
            allTicketsTbody.innerHTML += `<tr class="py-10  text-white">
                                    <td >${count}</td> 
                                    <td>${ticketIssueTime}</td> 
                                    <td>${ticketSubject}</td> 
                                    <td>${userName}</td>  
                                    <td>${userId}</td>  
                                    <td class=''>${organizationName}</td>  
                                    <td>${projectName}</td> 
                                    <td>${priority}</td> 
                                    <td>${status}</td> 
                                    <td><i onclick='action(${count})' class='cursor-pointer fa-regular fa-pen-to-square'></i></td> 
                                    </tr>`;
            count++;
            
        });
        
    } else {
        noDataMessage.classList.remove("hidden");
    }
}

const getUserData = () => {
    getUserInfo = getLocalStorageValue("userInfo");
    if (getUserInfo) {
        const key = Object?.keys(getUserInfo[0])[0];
        const userDashboardName = getELement("userDashboardName");
        userDashboardName.innerText = getUserInfo[0][key].userFullName;     
        userInfo = [...getUserInfo];
 
    }
    // console.log(getUserInfo[0][key].userFullName);
    
    displayTickets();
    
    
}

const goToCreatTicket = () => {
    location.href = '../creatTicket.html'
}


const showLogoutBtn = () => {
    const logoutBtn = getELement("logoutBtn");

    // logoutBtn.classList.remove('hidden')
    if (logoutBtn.classList === "hidden") {
        console.log(true);
        
    } else {
        console.log(false);
        
    }
}


const logOutUser = () => {
    removeLocalStrageValue("userInfo");
    location.replace('../login.html');
}