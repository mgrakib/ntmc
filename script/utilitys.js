/** @format */

// getElementById
const getELement = id => {
	const element = document.getElementById(id);
	return element;
};



const getLocalStorageValue = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

const setLocalStorageValue = (key, value) => {
	// localStorage.setItem(key, JSON.stringify([value]))
	localStorage.setItem(key, JSON.stringify(value));
};

const removeLocalStrageValue = (key) => {
	localStorage.removeItem(key);
}