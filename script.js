// script.js

// ফাংশন: লাভ ঝরা শুরু করে
function startHeartRain() {
    const heartContainer = document.getElementById('heart-container');
    if (!heartContainer) return;

    const colors = ['#d81e5b', '#ff69b4', '#ff8fa3', '#ffc2d1', '#c72c41', '#8338ec', '#ff4d6d']; 
    const totalHearts = 35;
    
    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        const size = Math.random() * 10 + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`; 
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        // অ্যানিমেশন দ্রুত করা: Duration 3s to 8s এর মধ্যে সেট করা হলো
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`; 
        
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        // ডায়নামিক CSS তৈরি করা হলো যাতে হার্টের সুনির্দিষ্ট রং সেট হয়
        const style = document.createElement('style');
        style.innerHTML = `
            .heart:nth-child(${i+1}) {
                transform: rotateZ(${Math.random() * 360}deg) !important;
            }
            .heart:nth-child(${i+1}), 
            .heart:nth-child(${i+1}):before, 
            .heart:nth-child(${i+1}):after {
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

// কার্ড খোলার মূল ফাংশন
function openCardAndStartAnimation() {
    const cardContainer = document.querySelector('.card-container');
    const openCardBtn = document.getElementById('openCardBtn');
    
    if (cardContainer) {
        // 1. কার্ড খোলার এনিমেশন
        cardContainer.classList.add('card-open');
        
        if (openCardBtn) {
            openCardBtn.style.display = 'none'; 
        }

        // 2. লাভ ঝরা শুরু (দ্রুত ফ্লিপের সাথে সামঞ্জস্য রেখে 300ms করা হলো)
        setTimeout(() => {
             startHeartRain();
        }, 300); 
        
        // লাভ ঘন ঘন তৈরি করা: Interval 2.5 সেকেন্ড করা হলো
        const heartInterval = setInterval(startHeartRain, 2500); 

        // 20 সেকেন্ড পর লাভ ঝরা বন্ধ করার জন্য:
        setTimeout(() => {
            clearInterval(heartInterval);
        }, 20000); 
    }
}
