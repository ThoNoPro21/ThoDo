// Change Avatar
const fileInput = document.getElementById('fileInput');
const avatarImage = document.getElementById('avatarImage');

fileInput.addEventListener('change', function(e) {
    console.log(e)
    const file = e.target.files[0];

    if (file) {
        // Kiểm tra file có phải ảnh không
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        // Đọc và hiển thị ảnh
        const reader = new FileReader();

        reader.onload = function(event) {
            avatarImage.src = event.target.result;

            // Thêm hiệu ứng animation
            avatarImage.style.opacity = '0';
            setTimeout(() => {
                avatarImage.style.transition = 'opacity 0.3s ease';
                avatarImage.style.opacity = '1';
            }, 100);
        };

        reader.readAsDataURL(file);

        // Có thể upload lên server tại đây
        // uploadToServer(file);
    }
});

// Emoji Rain
const emojiOverlay = document.getElementById('emojiOverlay');
const activeRains = new Map();

const emojiSets = {
    tiktok: [
        './img/social/tiktok-icon-free-png.png'
    ],
    facebook: [
        './img/social/2023_Facebook_icon.svg.png'
    ],
    zalo: [
        './img/social/Icon_of_Zalo.svg.webp',
    ]
};

function startEmojiRain(type) {
    if (activeRains.has(type)) {
        stopEmojiRain(type);
    }

    const emojis = emojiSets[type];

    const interval = setInterval(() => {
        createFallingEmoji(emojis);
    }, 150);

    activeRains.set(type, interval);
}

function stopEmojiRain(type) {
    if (activeRains.has(type)) {
        clearInterval(activeRains.get(type));
        activeRains.delete(type);
    }
}

function createFallingEmoji(emojis) {
    const emoji = document.createElement('img');
    emoji.classList.add('emoji');
    emoji.src = emojis[Math.floor(Math.random() * emojis.length)];

    const startX = 5 + Math.random() * 90;
    emoji.style.left = `${startX}%`;
    emoji.style.top = '-50px';


    const fallDistance = 200 + Math.random() * 100;
    emoji.style.setProperty('--fall-distance', `${fallDistance}px`);

    const xDrift = (Math.random() - 0.5) * 60;
    emoji.style.setProperty('--x-drift', `${xDrift}px`);

    const rotation = Math.random() * 720;
    emoji.style.setProperty('--rotation', `${rotation}deg`);


    const duration = 1.5 + Math.random() * 1;
    emoji.style.animationDuration = `${duration}s`;


    emoji.style.animationDelay = `${Math.random() * 0.1}s`;

    emojiOverlay.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, (duration + 0.1) * 1000);
}

// Tab Switching
function switchTab(tabId, button) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('text-gray-900');
        btn.classList.add('text-gray-500');

        const underline = btn.querySelector('span:last-child');
        if (underline) {
            underline.classList.add('scale-x-0');
        }
    });

    // Add active to clicked tab
    button.classList.add('active');
    button.classList.remove('text-gray-500');
    button.classList.add('text-gray-900');

    const activeUnderline = button.querySelector('span:last-child');
    if (activeUnderline) {
        activeUnderline.classList.remove('scale-x-0');
    }

    // Hide all content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Show selected content
    document.getElementById(tabId).classList.add('active');
}