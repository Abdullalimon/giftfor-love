// script.js

// ফাংশন: লাভ ঝরা শুরু করে
function startHeartRain() {
    const heartContainer = document.getElementById('heart-container');
    if (!heartContainer) return;

    // ভালোবাসার রঙের তালিকা
    const colors = ['#d81e5b', '#ff69b4', '#ff8fa3', '#ffc2d1', '#c72c41', '#8338ec']; 
    const totalHearts = 35;
    
    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // লাভের সাইজ নির্ধারণ
        const size = Math.random() * 10 + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // শুরুর অবস্থান নির্ধারণ
        heart.style.left = `${Math.random() * 100}vw`; 
        
        // অ্যানিমেশন দ্রুত করার জন্য delay ও duration সেট করা
        heart.style.animationDelay = `${Math.random() * 5}s`;
        // দ্রুত ঝরার জন্য animationDuration 3s to 8s এর মধ্যে সেট করা হলো
        heart.style.animationDuration = `${Math.random() * 5 + 3}s`; 
        
        // লাভগুলির রং পরিবর্তন (CSS পরিবর্তন না করে সরাসরি JavaScript দিয়ে)
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        heart.style.backgroundColor = randomColor; 
        
        // লাভ শেপের দুটো অর্ধগোলকের রংও সেট করতে হবে
        heart.style.setProperty('--heart-color', randomColor); 
        
        // ডায়নামিক CSS তৈরি করা হলো যাতে হার্টের সুনির্দিষ্ট রং সেট হয়
        // আগের জটিল স্টাইল লজিকটি সহজ করা হলো, শুধুমাত্র হার্টের বেস রং সেট করা হলো।
        // CSS-এ যেহেতু আমরা :before এবং :after ব্যবহার করে লাভ শেপ তৈরি করেছি, 
        // তাই আমাদের অবশ্যই CSS কোডে ফিরে গিয়ে লাভ শেপের রং সেট করার ব্যবস্থা করতে হবে।
        
        // দ্রুত ফিক্স: আমরা CSS-এর ':before' এবং ':after' এর ব্যাকগ্রাউন্ড কালার 
        // পরিবর্তন করতে পারি না, কারণ CSS-এ `:nth-child` সিলেক্টর দিয়ে রঙ পাল্টানো কঠিন। 
        // তাই, লাভ শেপের রং শুধুমাত্র CSS-এ `var(--primary-color)` হিসেবেই থাকবে 
        // অথবা হার্ট রেন্ডার হওয়ার পর স্টাইল ইঞ্জেক্ট করতে হবে।
        
        // আগের কোডের লজিকটি এখানে আবার ব্যবহার করা হলো যাতে নিশ্চিতভাবে কাজ করে
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

        // অপাসিটি 1 এ সেট করা হলো
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
