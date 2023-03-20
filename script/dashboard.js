
let getUserInfo;

let openArray;
let answeredArray;
let inProgressArray;
let closeArray;

const localStorageValue = getLocalStorageValue("registationInfo");
const userDashboardName = getELement("userDashboardName");
const noDataMessage = getELement("noDataMessage");
const nextPreviousBtnContainer = getELement("nextPreviousBtnContainer");

// this function set current user info in localStorage call from login
const setValue = (value) => {
    setLocalStorageValue("userInfo", [value]);
}

// count total number of array 
const totalCount = (array, proparty, value) => {
	const totalCount = array.filter(ticket => ticket[proparty] === value);
	return totalCount;
};


// set innertext of Total Number in open / inprogress/close/answered
const setValueToTotalNumberOfTicket = (
    inProgressArray,
	countTicket,
    newTicketNum,
    highPriorityTicketNum
) => {
	const countTicketElement = getELement(countTicket);
	const newTicketNumElement = getELement(newTicketNum);
	const highPriorityTicketNumElement = getELement(highPriorityTicketNum);

	// get toalheight priority array
	const totalHeighPriority = totalCount(
		inProgressArray,
		"priority",
		'High'
	);

	countTicketElement.innerText = inProgressArray.length
		? inProgressArray.length
		: 0;
	newTicketNumElement.innerText = inProgressArray.length
		? inProgressArray.length
		: 0;
	highPriorityTicketNumElement.innerText = totalHeighPriority.length
		? totalHeighPriority.length
		: 0;
};


// show total open ticket 
function showOpenNumber(openArray) {
    setValueToTotalNumberOfTicket(
		openArray,
		"countOpenTicket",
		"newOpenTicketNum",
        "highPriorityOpenTicketNum"
	);
}

// show total answered 
function showAnsweredNumber(answeredArray) {
    setValueToTotalNumberOfTicket(
		answeredArray,
		"countAnsweredTicket",
		"newAnsweredTicketNum",
		"highPriorityAnsweredTicketNum"
	);
}


// show total in progress 
function showInProgressNumber(inProgressArray) {
	setValueToTotalNumberOfTicket(
		inProgressArray,
		"countInProgressTicket",
		"newInProgressTicketNum",
		"highPriorityInProgressTicketNum",
		"High"
	);
}
// show total Close
function showCloseNumber(CloseArray) {
	setValueToTotalNumberOfTicket(
		CloseArray,
		"countCloseTicket",
		"newCloseTicketNum",
		"highPriorityCloseTicketNum",
		"High"
	);
}

const sortByNumber = () => {
	const numberOfResult = getELement("numberOfResult").value;

	setLocalStorageValue("totalNumberSHow", numberOfResult);
	location.reload()
	console.log('btnclick');
	
	
    displayTickets();
}

let nextValue = 1;
const nextNumberShow = () => {
	nextValue++;
	displayTickets();
}

const previousNumberShow = () => {
	nextValue--;
	
	displayTickets();
}

// display all ticket in table
const displayTickets = () =>{
    const allTickets = getLocalStorageValue('ticket');
    if (allTickets) {
		noDataMessage.classList.add("hidden");
		nextPreviousBtnContainer.classList.remove("hidden");
        const allTicketsTbody = getELement("allTicketsTbody");
        allTicketsTbody.innerHTML = '';

        // get value how many have to show
        let showticket = [];
		

		const totalShowNumber = getLocalStorageValue("totalNumberSHow");
		console.log(totalShowNumber);
		getELement("numberOfResult").value = totalShowNumber;
		
        if (allTickets.length >= totalShowNumber) {
            let newVAlue = [...allTickets];

			if (newVAlue.length <= totalShowNumber * nextValue) {
				document.getElementById("nextBtn").style.color = "gray";
				document.getElementById("nextBtn").disabled = true
				
			} else if (nextValue === 1) {
				document.getElementById("previouseBtn").disabled = true;
				document.getElementById("previouseBtn").style.color = 'gray';
			} else {
				document.getElementById("nextBtn").style.color = "white";
				document.getElementById("previouseBtn").style.color = "white";
				document.getElementById("nextBtn").disabled = false;
				document.getElementById("previouseBtn").disabled = false;
			}
				showticket = newVAlue.slice(
					totalShowNumber * nextValue - totalShowNumber,
					totalShowNumber * nextValue
				);

			
		} else {
			const nextBtn = getELement("nextBtn");
			
            showticket = [...allTickets];
        }
			// set array to open array to show open ticket
		openArray = allTickets.filter(ticket => ticket.status === "Open");
        showOpenNumber(openArray);

         // set array answeredArray array to show inprogress ticket
        answeredArray = allTickets.filter(
			ticket => ticket.status === "Answered"
        );
        showAnsweredNumber(answeredArray);

        // set array to inProgressArray array to show inprogress ticket
        inProgressArray = allTickets.filter(
			ticket => ticket.status === "In Progress"
        );
        showInProgressNumber(inProgressArray);

        // set array to CloseArray array to show Close ticket
        closeArray = allTickets.filter(ticket => ticket.status === "Close");
        showCloseNumber(closeArray);


        let count = 1;
        showticket.forEach(ticket => {
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
                                    <td class='ticketNumber'>${countTic}</td> 
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
		nextPreviousBtnContainer.classList.add("hidden");
		
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
    location.replace("../index.html");
}

// set the array which one is clicket by action
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

    const ticketNo = getELement("ticketNo");
    ticketNo.innerText =
		event.target.parentNode.parentNode.parentNode.querySelector(
			".ticketNumber"
		).innerText;
    

};

// action close 
const actionContainerClose = () => {
    const actionContainer = getELement("actionContainer");
	actionContainer.classList.add("hidden");
}

// change status value 
const changeStatusValue = (value) => {
    const allTickets = getLocalStorageValue("ticket");
	let getRestArray = allTickets.filter(
		ticket => ticket.countTic !== actionUserInfo[0].countTic
	);
	actionUserInfo[0].status = value;

	getRestArray = [...getRestArray, actionUserInfo[0]];
	getRestArray.sort((a, b) => {
		return a.countTic < b.countTic ? 1 : -1;
	});

	setLocalStorageValue("ticket", getRestArray);

	location.replace("../dashboard.html");
}

// inProgressTicket set 
const inProgressTicket = () => {
   changeStatusValue("In Progress");

}
// closeTicket ‍set
const closeTicket = () => {
    changeStatusValue('Close');
}


// answerTicket set
const answerTicket = () => {
    changeStatusValue("Answered");
}