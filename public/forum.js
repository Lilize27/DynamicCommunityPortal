document.addEventListener("DOMContentLoaded", () => {
    const forumForm = document.getElementById('forum-form');

    if (forumForm) {
        forumForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const forumMessage = document.getElementById('forum-message')?.value.trim();
            const username = requireLogin(); // <-- uses auth.js

            if (!username || !forumMessage) return;

            const res = await fetch('/api/forum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, message: forumMessage })
            });

            const data = await res.json();

            if (data.success) {
                alert("Message posted successfully!");
                document.getElementById('forum-message').value = '';
                loadForumMessages();
            } else {
                alert("Error posting message: " + data.error);
            }
        });

        loadForumMessages();
    }

    async function loadForumMessages() {
        const res = await fetch('/api/forum');
        const data = await res.json();

        const forum = document.getElementById('forum-list');
        if (!forum) return;

        forum.innerHTML = '';
        data.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'forum-msg';
            div.innerHTML = `<strong>${msg.username}</strong> <em>(${msg.time})</em>: ${msg.message}`;
            forum.appendChild(div);
        });
    }
});