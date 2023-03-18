
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
        allTicketsTbody.innerHTML = '';
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
				countTic,
			} = ticket;
            allTicketsTbody.innerHTML += `<tr class="py-10  text-white">
                                    <td>${count}</td> 
                                    <td>${ticketIssueTime}</td> 
                                    <td>${ticketSubject}</td> 
                                    <td>${userName}</td>  
                                    <td>${userId}</td>  
                                    <td class='py-3'>${organizationName}</td>  
                                    <td>${projectName}</td> 
                                    <td>${priority}</td> 
                                    <td>${status}</td> 
                                    <td><label for="ticketActionModal"><i for="ticketActionModal" onclick='actionContainerOpen(${countTic})' class='cursor-pointer fa-regular fa-pen-to-square'></i></label></td> 
                                    </tr>`;
            count++;
            
        });
        
    } else {
        noDataMessage.classList.remove("hidden");
    }
}

// get data from localStorageValue
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

// got to ticket creat 
const goToCreatTicket = () => {
    location.href = '../creatTicket.html'
}



// logout function
const logOutUser = () => {
    removeLocalStrageValue("userInfo");
    location.replace('../login.html');
}


const actionUserInfo = [];

// actionOpen
const actionContainerOpen = countTic => {
	
	const actionContainer = getELement("actionContainer");
	actionContainer.classList.remove("hidden");
	const allTickets = getLocalStorageValue("ticket");

	const clickedTicket = allTickets.find(ticket => ticket.countTic === countTic
);
    
    actionUserInfo.push(clickedTicket);

    // set actionTicketStatus value
    const actionTicketStatus = getELement("actionTicketStatus");
    actionTicketStatus.innerText = clickedTicket.status;

    // set actionTicketPriority  value 
    const actionTicketPriority = getELement("actionTicketPriority");
    actionTicketPriority.innerText = clickedTicket.priority;

    // set actionTicketDescription  value 
    const actionTicketDescription = getELement("actionTicketDescription");
    actionTicketDescription.innerText = clickedTicket.ticketDescription;
};



// action close 
const actionContainerClose = () => {
    const actionContainer = getELement("actionContainer");
	actionContainer.classList.add("hidden");
}

// inProgressTicket set 
const inProgressTicket = () => {
    const allTickets = getLocalStorageValue('ticket');
    console.log(allTickets);
    let getRestArray = allTickets.filter(
		ticket => ticket.countTic !== actionUserInfo[0].countTic
	);
    actionUserInfo[0].status = "In Progress";
    console.log(actionUserInfo[0]);

    console.log(getRestArray);

    getRestArray = [...getRestArray, actionUserInfo[0]];

    getRestArray.sort((a, b) => {
        return a.countTic < b.countTic ? 1 : -1;
    })
    
    setLocalStorageValue("ticket", getRestArray);
    
    location.replace('../dashboard.html')


}

