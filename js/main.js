
//  Creates new HTML element using given element name, text content, and class name(optional)
const createElemWithText = (htmlElement = 'p', text, className = null) => {
    const newElement = document.createElement(htmlElement);
    newElement.textContent = text;
    if (className) { // add class to element if given one
        newElement.classList.add(className);
    }
    return newElement;
};

// Used to test createSelectOptions()
/*
const myCoolFunction = async () => { // arrow function
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
        // tells code to wait to get results before doing next thing
    const jsonUserData = await response.json();
        // awaiting a promise to resolve before get that data 
    createSelectOptions(jsonUserData);
};
*/

// Creates option element for each user 
const createSelectOptions = (jsonUserData = null) => {
    if (!jsonUserData) return undefined; //return if no parameter recieved

    // holds all user options
    const optionArray = [];

    // loop through user data and add option element to each user
    jsonUserData.forEach( user => {
        //create option element using document.createElement()
        const option = document.createElement("option");
        // assign user.id to option.value
        option.value = user.id;
        // assign user.name to option.textContent
        option.textContent = user.name;
        // add user option to array
        optionArray.push(option);
    }); 

    // return aray of options elements
    return optionArray;
};

// Toggles the 'hide' class in section with data-post-id equal to given postID
const toggleCommentSection = (postID = null) => {
    if (!postID) return undefined;
    const section = document.querySelector(`section[data-post-id="${postID}"]`);

    if (!section) return null;
    section.classList.toggle("hide");

    return section;
};

// Toggles the text in button with data-post-id equal to given postID
const toggleCommentButton = (postID = null) => {
    if (!postID) return undefined;
    const button = document.querySelector(`button[data-post-id="${postID}"]`);

    if (!button) return null;
    button.textContent === "Show Comments" 
        ? button.textContent = "Hide Comments"
        : button.textContent = "Show Comments";

    return button;
};

// Deletes all childern elements of given parent 
const deleteChildElements = (parentElement) => {
    if (!(parentElement instanceof Element)) return undefined; // ensure the element is HTML
    let child = parentElement.lastElementChild;
    if (!child) return parentElement; // ensure at least one child
    // loop through all child
    while (child) {
        parentElement.removeChild(child); // delete child
        child = parentElement.lastElementChild; // go to next child
    }
    return parentElement;
};

