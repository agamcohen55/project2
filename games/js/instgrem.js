const signupButton = document.getElementById("signup");
const loginButton = document.getElementById("login");
const galleryContainer = document.getElementById("gallery");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
let currentUser = null;

signupButton.addEventListener("click", signup);
loginButton.addEventListener("click", login);

function signup() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        alert("יש למלא את כל השדות");
        return;
    }

    // כאן תוכל לשמור את המשתמש במקום מתאים, כמו Local Storage

    alert("נרשמת בהצלחה");
}

function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!username || !password) {
        alert("יש למלא את כל השדות");
        return;
    }

    // כאן תוכל לבדוק אם המשתמש קיים והסיסמה נכונה

    // אם המשתמש קיים והסיסמה נכונה
    currentUser = username;
    showGallery();
    alert("ברוך הבא, " + currentUser);
}

function showGallery() {
    // כאן יש להציג את אזור הגלריה
    galleryContainer.style.display = "block";
}
  

function shrinkImages() {
    const images = document.querySelectorAll(".gallery-item img");
    images.forEach(image => {
        image.style.transform = "scale(0.5)"; 
    });
}

addPost("תמונה 1",  "imges/אגם כהן.jpg");
addPost("תמונה 2", "imges/img-JS.png");
addPost("תמונה 2", "imges/dog.jpg");
addPost("תמונה 2", "imges/Coffee.png");
addPost("תמונה 2", "imges/נועה קירל.jpg");


function addPost(caption, imageUrl) {
    const post = createPostElement(caption, imageUrl);
    galleryContainer.appendChild(post);
}

function createPostElement(caption, imageUrl) {
    const post = document.createElement("div");
    post.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = caption;

    const likeButton = createLikeButton();

    post.appendChild(img);
    post.appendChild(likeButton);

    likeButton.addEventListener("click", toggleLike);

    return post;
}

function createLikeButton() {
    const likeButton = document.createElement("button");
    likeButton.textContent = "❤️";
    likeButton.classList.add("like-button");
    return likeButton;
}

function toggleLike(event) {
    const likeButton = event.target;
    const post = likeButton.closest(".gallery-item");
    post.classList.toggle("liked");
}
