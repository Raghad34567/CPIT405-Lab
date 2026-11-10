// Read a cookie by name
function getCookie(name) {
    const cookie = document.cookie.split('; ').find(item => item.startsWith(name + '='));
    return cookie ? decodeURIComponent(cookie.substring(name.length + 1)) : null;
}

// Save a cookie for 30 days
function setCookie(name, value) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; max-age=2592000; path=/; SameSite=Lax';
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = name + '=; max-age=0; path=/; SameSite=Lax';
}

const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');
const likeCount = document.getElementById('likeCount');
const dislikeCount = document.getElementById('dislikeCount');
const commentInput = document.getElementById('commentInput');
const submitBtn = document.getElementById('submitBtn');
const clearBtn = document.getElementById('clearBtn');
const commentsSection = document.getElementById('commentsSection');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

// Initial state comes from cookies, if available
let likes = Number(getCookie('lab6_likes') || 0);
let dislikes = Number(getCookie('lab6_dislikes') || 0);
let vote = getCookie('lab6_vote');
let comments = [];
try {
    const stored = JSON.parse(getCookie('lab6_comments') || '[]');
    if (Array.isArray(stored)) comments = stored;
} catch (error) {
    comments = [];
}
let hasCommented = getCookie('lab6_commented') === 'yes';

function updateUI() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;
    likeBtn.disabled = vote !== null;
    dislikeBtn.disabled = vote !== null;
    submitBtn.disabled = hasCommented;

    commentsSection.innerHTML = '';
    comments.forEach(function(comment) {
        const p = document.createElement('p');
        p.className = 'comment';
        p.textContent = comment; // Safe: treats entered text as text, not HTML
        commentsSection.appendChild(p);
    });
}

function castVote(choice) {
    if (vote !== null) {
        message.textContent = 'You have already voted.';
        return;
    }
    vote = choice;
    if (choice === 'like') likes++;
    else dislikes++;
    setCookie('lab6_vote', vote);
    setCookie('lab6_likes', String(likes));
    setCookie('lab6_dislikes', String(dislikes));
    message.textContent = 'Thank you for voting!';
    updateUI();
}

likeBtn.addEventListener('click', function() { castVote('like'); });
dislikeBtn.addEventListener('click', function() { castVote('dislike'); });

submitBtn.addEventListener('click', function() {
    if (hasCommented) {
        message.textContent = 'You have already submitted a comment.';
        return;
    }
    const comment = commentInput.value.trim();
    if (comment === '') {
        message.textContent = 'Please write a comment first.';
        return;
    }
    comments.push(comment);
    hasCommented = true;
    setCookie('lab6_comments', JSON.stringify(comments));
    setCookie('lab6_commented', 'yes');
    commentInput.value = '';
    message.textContent = 'Comment submitted!';
    updateUI();
});

// Clear the text field only (does not delete an already submitted comment)
clearBtn.addEventListener('click', function() {
    commentInput.value = '';
    message.textContent = '';
});

resetBtn.addEventListener('click', function() {
    likes = 0;
    dislikes = 0;
    vote = null;
    comments = [];
    hasCommented = false;
    ['lab6_likes', 'lab6_dislikes', 'lab6_vote', 'lab6_comments', 'lab6_commented'].forEach(deleteCookie);
    commentInput.value = '';
    message.textContent = 'Votes and comments have been reset.';
    updateUI();
});

updateUI();
