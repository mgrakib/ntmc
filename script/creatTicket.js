const userInfo = [];
let countTic = 0;
const creatTicket = () => {
    const nowDate = new Date();
	const projectName = getELement("projectName").value;
	const priority = getELement("priority").value;
	const ticketSubject = getELement("ticketSubject").value;
	const ticketDescription = getELement("ticketDescription").value;
    const ticketIssueTime = nowDate.toLocaleDateString();
	const organizationName = "National Telecommunication and Monitoring Center";
	const userId = Object.keys(userInfo[0])[0];
	const userName = userInfo[0][userId].userFullName;

	
    const ticketObject = {
        countTic,
		userId,
		userName,
		projectName,
		priority,
		ticketSubject,
		ticketDescription,
		ticketIssueTime,
        organizationName,
		status: 'Open'
    };
    
    let creatTicketToLocalStorage = getLocalStorageValue('ticket');

    if (creatTicketToLocalStorage) {
       localStorage.setItem(
			"ticket",
			JSON.stringify([...creatTicketToLocalStorage, ticketObject])
		);
        
     
    } else {
        setLocalStorageValue("ticket", [ticketObject]);
	}
	
	getELement("projectName").value = "Choose";
	getELement("priority").selectedIndex = 0;
	getELement("ticketSubject").value = '';
	getELement("ticketDescription").value = '';

	location.href = "../dashboard.html";
}