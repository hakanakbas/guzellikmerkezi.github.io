// --- AYARLAR ---
const phoneNumber = "32488595967"; // Belirtilen telefon numarası

// İlan sayılarını buradan yönetebilirsin
const adConfig = {
    platinum: 3,
    gold: 3,
    silver: 3
};

// Rastgele görsel anahtar kelimeleri
const imageKeywords = ['car', 'architecture', 'nature', 'city', 'tech', 'business'];

/**
 * Rastgele görsel URL'si üretir
 */
function getRandomImage(index) {
    const keyword = imageKeywords[index % imageKeywords.length];
    return `https://loremflickr.com/400/300/${keyword}?random=${index}`;
}

/**
 * WhatsApp Link Oluşturucu Yardımcı Fonksiyon
 * Format: Premium ilan [isim] hakkında bilgi almak istiyorum
 */
function createWaLink(itemName) {
    const message = `Premium ilan [${itemName}] hakkında bilgi almak istiyorum`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * İlan Kartı HTML'i Oluşturan Fonksiyon
 */
function createAdCard(title, seed) {
    let imagesHTML = '';
    // 1. Set (4 Resim)
    for(let i=1; i<=4; i++) {
        imagesHTML += `<img src="${getRandomImage(seed + i)}" alt="Ad Image">`;
    }
    // 2. Set (Loop için kopya)
    for(let i=1; i<=4; i++) {
        imagesHTML += `<img src="${getRandomImage(seed + i)}" alt="Ad Image">`;
    }

    // WhatsApp Linkini oluştur
    const waLink = createWaLink(title);

    return `
        <div class="ad-row">
            <div class="slider-wrapper">
                ${imagesHTML}
            </div>
            <div class="ad-overlay">
                <h3 class="ad-title">${title}</h3>
                <a href="${waLink}" class="whatsapp-btn" target="_blank">
                    WhatsApp Mesaj Gönder
                </a>
            </div>
        </div>
    `;
}

/**
 * Sayfa Yüklendiğinde Çalışacak Ana Fonksiyon
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Premium Banner Linkini Ayarla
    const randomPremiumId = "PRM-" + Math.floor(Math.random() * 9000 + 1000); 
    const premiumBtn = document.getElementById('premium-btn');
    if(premiumBtn) {
        premiumBtn.href = createWaLink(randomPremiumId);
    }

    // 2. İlanları Doldur (Platinum)
    const platinumContainer = document.getElementById('platinum-container');
    if(platinumContainer) {
        for(let i=0; i<adConfig.platinum; i++) {
            platinumContainer.innerHTML += createAdCard(`Platinum Fırsat #${i+1}`, i * 10);
        }
    }

    // 3. İlanları Doldur (Gold)
    const goldContainer = document.getElementById('gold-container');
    if(goldContainer) {
        for(let i=0; i<adConfig.gold; i++) {
            goldContainer.innerHTML += createAdCard(`Gold Kampanya #${i+1}`, i * 20 + 100);
        }
    }

    // 4. İlanları Doldur (Silver)
    const silverContainer = document.getElementById('silver-container');
    if(silverContainer) {
        for(let i=0; i<adConfig.silver; i++) {
            silverContainer.innerHTML += createAdCard(`Silver İlan #${i+1}`, i * 30 + 200);
        }
    }
});