let userArray;
let getUserInfo;
const localStorageValue = getLocalStorageValue("registationInfo");
const userDashboardName = getELement("userDashboardName");
const setValue = (value) => {
    userArray = value;
    setLocalStorageValue("userInfo", [userArray]);
    
}

const displayTickets = () =>{
    const allTickets = getLocalStorageValue('ticket');
    if (allTickets) {
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
        
    }
}


const getUserData = () => {
    getUserInfo = getLocalStorageValue("userInfo");
    if (getUserInfo) {
        const key = Object?.keys(getUserInfo[0])[0];
        const userDashboardName = getELement("userDashboardName");
		userDashboardName.innerText = getUserInfo[0][key].userFullName;
        
        userInfo.push(getUserInfo[0]);        
    }
    // console.log(getUserInfo[0][key].userFullName);
    
    displayTickets();
    
    
}

const goToCreatTicket = () => {
    location.href = '../creatTicket.html'
}