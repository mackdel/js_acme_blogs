
//  1. Creates new HTML element using given element name, text content, and class name(optional)
const createElemWithText = (htmlElement = 'p', text, className = null) => {
    const newElement = document.createElement(htmlElement);
    newElement.textContent = text;
    if (className) { // add class to element if given one
        newElement.classList.add(className);
    }
    return newElement;
};

// 2. Creates option element for each user 
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

// 3. Toggles the 'hide' class in section with data-post-id equal to given postID
const toggleCommentSection = (postID = null) => {
    if (!postID) return undefined;
    const section = document.querySelector(`section[data-post-id="${postID}"]`);

    if (!section) return null;
    section.classList.toggle("hide");

    return section;
};

// 4. Toggles the text in button with data-post-id equal to given postID
const toggleCommentButton = (postID = null) => {
    if (!postID) return undefined;
    const button = document.querySelector(`button[data-post-id="${postID}"]`);

    if (!button) return null;
    button.textContent === "Show Comments" 
        ? button.textContent = "Hide Comments"
        : button.textContent = "Show Comments";

    return button;
};

// 5. Deletes all childern elements of given parent 
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

// 6. Adds event listeners to all buttons in main
// uses toggleComments
const addButtonListeners = () => {
    // select all buttons inside main element
    const buttons = document.querySelectorAll("main button");
    if (buttons) {
        // loop through buttons
        for (let i = 0; i < buttons.length; i++) {
            const postId = buttons[i].dataset.postId;
            if (postId) {
                // add event listener to button with given postId
                buttons[i].addEventListener("click", (event) => {
                    toggleComments(event, postId);
                });
            }

        }
    }
    return buttons; 
};

// 7. Removes event listeners to all buttons in main
const removeButtonListeners = () => {
    // select all buttons inside main element
    const buttons = document.querySelectorAll("main button");
    if (buttons) {
        // loop through buttons
        for (let i = 0; i < buttons.length; i++) {
            const postId = buttons[i].dataset.postId;
            if (postId) {
                // remove event listener to button with given postId
                buttons[i].removeEventListener("click", (event) => {
                    toggleComments(event, postId);
                });
            }
        }
    }
    return buttons; 
};

// 8. Creates fragment that contains comments
// Uses createElemWithText
const createComments = (jsonComments = null) => {
    if (!jsonComments) return undefined; //return if no parameter recieved

    // creates fragment element
    const fragment = document.createDocumentFragment();

    // loop through comments 
    for (comment of jsonComments){
        const article = document.createElement("article");
        const h3 = createElemWithText('h3', comment.name);
        const p1 = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        article.append(h3, p1, p2);
        fragment.append(article);
    }

    return fragment; 
};

// 9. Adds options to select menu
// Uses createSelectOptions()
const populateSelectMenu = (jsonUserData = null) => {
    if (!jsonUserData) return undefined; //return if no parameter recieved
    const selectMenu = document.querySelector("#selectMenu");
    const optionsArray = createSelectOptions(jsonUserData);
    // loop through options
    for (option of optionsArray) {
        // append options to select menu
        selectMenu.append(option);
    }
    return selectMenu;
}

// 10. Fetches user data from https://jsonplaceholder.typicode.com/
const getUsers = async () => { 
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const jsonUsersData = await response.json();
        return jsonUsersData;
    } catch (error) {
        console.error(`Fetching user data failed! ${error.stack}`);
    }
};

// 11. Fetches posts data from specific user from https://jsonplaceholder.typicode.com/
const getUserPosts = async (userId) => { 
    if (!userId) return userId; //return if no parameter recieved
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const jsonPostData = await response.json();
        return jsonPostData;
    } catch (error) {
        console.error(`Fetching user posts data failed! ${error.stack}`);
    }
};

// 12. Fetches data from specific user from https://jsonplaceholder.typicode.com/
const getUser = async (userId) => { 
    if (!userId) return userId; //return if no parameter recieved
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const jsonUserData = await response.json();
        return jsonUserData;
    } catch (error) {
        console.error(`Fetching user data failed! ${error.stack}`);
    }
};

// 13. Fetches comment from specific post id from https://jsonplaceholder.typicode.com/
const getPostComments = async (postId) => { 
    if (!postId) return postId; //return if no parameter recieved
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const jsonCommentData = await response.json();
        return jsonCommentData;
    } catch (error) {
        console.error(`Fetching user data failed! ${error.stack}`);
    }
};

// 14. Creates section element with comment using postId for display
// Uses getPostComments and createComments
const displayComments = async (postId) => {
    if (!postId) return postId; //return if no parameter recieved

    // create section element with postId and two classes
    const section = document.createElement("section");
    section.dataset.postId = postId;
    section.classList.add("comments", "hide");

    const comments = await getPostComments(postId); // fetches comment with given postId
    const fragment = await createComments(comments); // creates comment fragment 

    section.append(fragment); 
    return section;
};

// 15. Creates posts
// Uses createElemWithText(), getUser(), displayComments() 
const createPosts = async (jsonPosts) => {
    if (!jsonPosts) return undefined; //return if no parameter recieved

    // creates fragment element
    const fragment = document.createDocumentFragment();

    // loop through posts 
    for (post of jsonPosts){
        const article = document.createElement("article");
        const h2 = createElemWithText('h2', post.title);
        const p1 = createElemWithText('p', post.body);
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const p4 = createElemWithText('p', author.company.catchPhrase);
        const button = createElemWithText('button', "Show Comments");
        button.dataset.postId = post.id

        article.append(h2, p1, p2, p3, p4, button);

        const section = await displayComments(post.id);
        article.append(section);

        fragment.append(article);
    }
    return fragment;
};

// 16. Creates element with posts to display
// Uses createPosts and createElemWithText
const displayPosts = async (jsonPosts) => {
    const main = document.querySelector("main");

    const element = (jsonPosts)
        ? await createPosts(jsonPosts)
        : createElemWithText('p', "Select an Employee to display their posts.", "default-text");

    main.append(element);
    return element;
};

// 17. 
// Uses toggleCommentSection, toggleCommentButton
const toggleComments = (event, postId) => {
    if (!event || !postId) return undefined; // return if no event or postId
    event.target.listener = true; // testing purposes

    const section = toggleCommentSection(postId);
    const comment = toggleCommentButton(postId);

    return [section, comment];
};

// 18.
// Uses removeButtonListeners, deleteChildElements, displayPosts, addButtonListeners
const refreshPosts = async (jsonData) => {
    if (!jsonData) return undefined; //return if no parameter recieved

    const removeButtons = removeButtonListeners(); // buttons in main with event listeners removed
    const main = deleteChildElements(document.querySelector('main')); // main element with no child elements
    const fragment = await displayPosts(jsonData);
    const addButtons = addButtonListeners(); // buttons with event listeners added 

    return [removeButtons, main, fragment, addButtons];
};

// 19.
// Uses getUserPosts, refreshPosts
const selectMenuChangeEventHandler =  async (event) => {
    if (!event) return undefined; //return if no change event

    const selectMenu = event.target;
    if (selectMenu) { event.target.disabled = true; }// diables select menu

    const userId = selectMenu.value || 1; // 1 is fallback value
    const posts = await getUserPosts(userId);
    const refreshPostsArray = refreshPosts(posts);

    if (selectMenu) { event.target.disabled = false; }// enables select menu    
    return [userId, posts, refreshPostsArray];
};

// 20.
// Uses populateSelectMenu
const initPage = async () => {
    users = await getUsers();
    select = populateSelectMenu(users);
    return [users, select];
}

// 21.
// Uses initPage, selectMenuChangeEventHandler
const initApp = () => {
    initPage();
    const select = document.getElementById("selectMenu");
    console.log(select);
    select.addEventListener("change", selectMenuChangeEventHandler, false);
};

document.addEventListener("DOMContentLoaded", initApp, false);