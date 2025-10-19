// script.js

// ফাংশনটিকে গ্লোবালি ডিক্লেয়ার করা হলো যাতে HTML-এর onclick অ্যাট্রিবিউট এটিকে খুঁজে পায়
function startHeartRain() {
    const heartContainer = document.getElementById('heart-container');
    if (!heartContainer) return;

    const colors = ['#d81e5b', '#ff69b4', '#ff8fa3', '#ffc2d1', '#c72c41', '#8338ec']; 
    const totalHearts = 35;
    
    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = Math.random() * 10 + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`; 
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.animationDuration = `${Math.random() * 5 + 7}s`;
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // ডায়নামিক CSS স্টাইল তৈরি করে লাভ শেপকে কালার করা
        const style = document.createElement('style');
        style.innerHTML = `
            .heart:nth-child(${i+1}) {
                background-color: ${randomColor} !important;
                transform: rotateZ(${Math.random() * 360}deg) !important;
            }
            .heart:nth-child(${i+1}):before, .heart:nth-child(${i+1}):after {
                background-color: ${randomColor} !important;
            }
        `;
        document.head.appendChild(style);

        heart.style.opacity = 1;
        heartContainer.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
}

// কার্ড খোলার মূল ফাংশন, যা বাটন ক্লিক করলে সরাসরি কল হবে
function openCardAndStartAnimation() {
    const cardContainer = document.querySelector('.card-container');
    const openCardBtn = document.getElementById('openCardBtn');
    
    if (cardContainer) {
        // 1. কার্ড খোলার এনিমেশন
        cardContainer.classList.add('card-open');
        
        if (openCardBtn) {
            openCardBtn.style.display = 'none'; // বাটন লুকিয়ে ফেলা হলো
        }

        // 2. লাভ ঝরা শুরু
        setTimeout(() => {
             startHeartRain();
        }, 500); // ফ্লিপ এনিমেশনের সাথে সাথে শুরু হবে
        
        // লাভ বারবার তৈরি করার জন্য সেট ইন্টারভাল
        const heartInterval = setInterval(startHeartRain, 4000); 

        // 20 সেকেন্ড পর লাভ ঝরা বন্ধ করার জন্য:
        setTimeout(() => {
            clearInterval(heartInterval);
        }, 20000); 
    }
}