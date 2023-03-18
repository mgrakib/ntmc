
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

// display all ticket in table
const displayTickets = () =>{
    const allTickets = getLocalStorageValue('ticket');
    if (allTickets) {
        noDataMessage.classList.add("hidden");
        const allTicketsTbody = getELement("allTicketsTbody");

        allTickets.forEach(ticket => {
            console.log(ticket);
            
            const {
                countTic,
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
                                    <td >${countTic}</td> 
                                    <td>${ticketIssueTime}</td> 
                                    <td>${ticketSubject}</td> 
                                    <td>${userName}</td>  
                                    <td>${userId}</td>  
                                    <td class=''>${organizationName}</td>  
                                    <td>${projectName}</td> 
                                    <td>${priority}</td> 
                                    <td>${status}</td> 
                                    <td><i onclick='action(${countTic})' class='cursor-pointer fa-regular fa-pen-to-square'></i></td> 
                                    </tr>`;
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