async function loadFriendLinks() {
    try {
        const response = await fetch('friendlinks.json');
        const links = await response.json();
        const container = document.getElementById('linksContainer');
        
        if (!links.length) {
            container.innerHTML = '<p class="loading">暂无友链</p>';
            return;
        }
        
        container.innerHTML = '';
        links.forEach(link => {
            container.innerHTML += `
                <a href="${link.url}" class="friend-link" target="_blank" rel="noopener noreferrer">
                    <img src="${link.avatar}" alt="${link.name}" class="avatar" onerror="this.src='https://via.placeholder.com/80'">
                    <div class="info">
                        <div class="name">${link.name}</div>
                        <div class="desc">${link.desc}</div>
                    </div>
                </a>
            `;
        });
    } catch (error) {
        document.getElementById('linksContainer').innerHTML = `
            <div class="loading">
                <p>友链加载失败</p>
                <button onclick="loadFriendLinks()" class="btn" style="font-family: inherit;">重试</button>
            </div>
        `;
    }
}

function showToast(message, duration = 2000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

const toggleBtn = document.getElementById('toggleEmail');
const emailMenu = document.getElementById('emailMenu');
let isMenuVisible = false;

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuVisible = !isMenuVisible;
    emailMenu.classList.toggle('show', isMenuVisible);
    toggleBtn.textContent = isMenuVisible ? '收起菜单' : '添加友链';
});

document.addEventListener('click', (e) => {
    if (!emailMenu.contains(e.target) && e.target !== toggleBtn && isMenuVisible) {
        emailMenu.classList.remove('show');
        isMenuVisible = false;
        toggleBtn.textContent = '添加友链';
    }
});

emailMenu.addEventListener('click', (e) => {
    const copyElement = e.target.closest('[data-copy]');
    if (copyElement) {
        copyToClipboard(copyElement.getAttribute('data-copy'));
        showToast('已复制到剪切板');
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
}

document.addEventListener('DOMContentLoaded', loadFriendLinks);