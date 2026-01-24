const prizes = [
    {
        title: "iPhone 17",
        wheelImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:100/plain/https://cellphones.com.vn/media/wysiwyg/Phone/Apple/iPhone-17/iphone-17-pro-16.jpg",
        popupImg: "https://cdn.24h.com.vn/upload/3-2025/images/2025-09-11/c-gach-iphone-17-63468-width1024height1024--1--1757577780-221-width740height495_schema_article.jpg",
        text: "Bạn đã trúng iPhone 17 Pro Max siêu xịn!"
    },
    {
        title: "500K",
        wheelImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHCWaB8RCCJ8aoCcW2chYNRKA-PU1yjiSxQ&s",
        popupImg: "https://down-vn.img.susercontent.com/file/8cbdc8ae46d5268af809048b6fefd89c",
        text: "Bạn đã trúng 500.000 nghìn đồng !"
    }, {
        title: "Nhẫn vàng",
        wheelImg: "https://cdn.shopify.com/s/files/1/0849/3147/7815/files/Thiet_ke_chua_co_ten_5_9bf38055-c4ec-4d16-8ab2-ae8952711e48_480x480.png?v=1706518536",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng nhẫn!"
    }, {
        title: "Lì xì 10k CK",
        wheelImg: "https://cdn2.tuoitre.vn/zoom/700_390/tto/i/s626/2006/09/08/2uyv6gFg.jpg",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng 10K!"
    },
    {
        title: "Bánh ga tô",
        wheelImg: "https://tudonghoangaynay.vn/stores/news_dataimages/2025/012025/14/15/banh-kem-trai-cay-thumbnail20250114153758.jpg?rt=20250114153759",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng iPhone 16 Pro Max siêu xịn!"
    },
    {
        title: "Đi xem biển",
        wheelImg: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/11/1/1111548/Bai-Dai-Phu-Quoc-1.jpg",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng iPhone 16 Pro Max siêu xịn!"
    },
    {
        title: "Lì xì 10k tiền mặt",
        wheelImg: "https://cdn.nhandan.vn/images/78d92bfef5333421c1cfa9f19aa2572af2f6454a381555b801846adcfda20221ff5beddd3b831f8b44d4e630a2c2806e414b0ed7777b873ace4517f6f4d14ef52c231e7d54ad988cd96b72fc7c0dc38a/ad576bf562a84ee156fd691bcff09f1a.jpg",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng iPhone 16 Pro Max siêu xịn!"
    },
    {
        title: "Dẫn đi xem hổ",
        wheelImg: "https://transforms.stlzoo.org/production/animals/amur-tiger-01-01.jpg?w=1200&h=1200&auto=compress%2Cformat&fit=crop&dm=1658935145&s=95d03aceddd44dc8271beed46eae30bc",
        popupImg: "https://cdn.tgdd.vn/Products/Images/42/240259/Slider/iphone-14-thumb-yt-1020x570.jpg",
        text: "Bạn đã trúng iPhone 16 Pro Max siêu xịn!"
    },
];

const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD", "#D4A5A5"];
let theWheel = null;
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const centerBtn = document.getElementById('centerBtn');
const popup = document.getElementById('congratsPopup');

const wheelImages = {};
let loadedCount = 0;
let isSpinning = false;

prizes.forEach((p, i) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = p.wheelImg;
    img.onload = () => {
        wheelImages[i] = img;
        loadedCount++;
        if (loadedCount === prizes.length) {
            initWheel();
        }
    };
    img.onerror = () => {
        loadedCount++;
        if (loadedCount === prizes.length) {
            initWheel();
        }
    };
});

function initWheel() {
    theWheel = new Winwheel({
        'canvasId': 'myCanvas',
        'outerRadius': 280,
        'innerRadius': 100,
        'textFontSize': 22,
        'textFillStyle': 'white',
        'textFontWeight': 'bold',
        'textFontFamily': 'Arial, sans-serif',
        'textOrientation': 'horizontal',
        'textAlignment': 'outer',
        'textMargin': 10,
        'numSegments': prizes.length,
        'segments': prizes.map((p, i) => ({
            'fillStyle': colors[i % colors.length],
            'text': p.title,
            'textFontSize': 18,
            'textFillStyle': '#ffffff'
        })),
        'animation': {
            'type': 'spinToStop',
            'duration': 5,
            'spins': 8,
            'callbackFinished': showCongrats,
            'callbackAfter': drawWheelImages
        },
        'pins': {
            'number': prizes.length,
            'fillStyle': 'white',
            'outerRadius': 8
        }
    });

    theWheel.draw();
    drawWheelImages();
}

function drawWheelImages() {
    const numSegments = prizes.length;
    const anglePerSegment = 360 / numSegments;

    prizes.forEach((prize, index) => {
        if (!wheelImages[index]) return;

        // Tính góc giữa của segment
        const segmentAngle = (index * anglePerSegment) + (anglePerSegment / 2);
        const totalAngle = theWheel.rotationAngle + segmentAngle;
        const angleRad = (totalAngle - 90) * Math.PI / 180;

        // Vị trí ảnh - đặt gần viền trong hơn (để ảnh ở dưới text)
        const imgDistance = 90;
        const x = theWheel.centerX + Math.cos(angleRad) * imgDistance;
        const y = theWheel.centerY + Math.sin(angleRad) * imgDistance;
        const imgSize = 55;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angleRad + Math.PI / 2);

        // Vẽ background trắng
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(0, 0, imgSize / 2 + 4, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Clip và vẽ ảnh
        ctx.beginPath();
        ctx.arc(0, 0, imgSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(wheelImages[index], -imgSize / 2, -imgSize / 2, imgSize, imgSize);

        ctx.restore();
    });
}

function showCongrats(indicatedSegment) {
    isSpinning = false;
    if (centerBtn) centerBtn.classList.remove('spinning');

    const winningIndex = indicatedSegment.text;
    const index = prizes.findIndex(p => p.title === winningIndex);
    const prize = prizes[index >= 0 ? index : 0];

    createConfetti();

    setTimeout(() => {
        document.getElementById('prizeTitle').textContent = "CHÚC MỪNG! 🎉";
        document.getElementById('prizeText').textContent = prize.text;
        document.getElementById('prizeImage').src = prize.popupImg;

        popup.style.display = 'flex';

    }, 500);
}

function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#6BCB77', '#FFB6B9'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animation = `confetti-fall ${2 + Math.random() * 3}s linear`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function closePopup() {
    popup.style.display = 'none';
}

function startSpin() {
    if (isSpinning) return;

    isSpinning = true;
    if (centerBtn) centerBtn.classList.add('spinning');

    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    drawWheelImages();

    theWheel.startAnimation();
}


if (centerBtn) {
    centerBtn.addEventListener('click', startSpin);
}