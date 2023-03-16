document
	.getElementById("agreeInputCheckBox")
	.addEventListener("click", function () {
		const agreeInputCheckBox =
            document.getElementById("agreeInputCheckBox");
		const loginBtnDiv =
            document.getElementById("loginBtnDiv");
        
        if (agreeInputCheckBox.checked === true) {
            loginBtnDiv.classList.remove('hidden');
        } else {
            loginBtnDiv.classList.add("hidden");
        }
	});