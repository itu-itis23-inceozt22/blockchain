/*
console.log("1.Likidite Ekle.");
console.log("2.Swap");
console.log("3.Havuz durumunu Görüntüle");
console.log("4.Kullanici bakiyesinşi görüntüle");
console.log("5.Çikis.");

const readline = require("readline");
const { setTimeout } = require("timers");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("yapmak istediğiniz işlemin numarasini giriniz. ", (answer) => {
    let userinput = parseInt(answer, 10);
    secme(userinput);
    rl.close();
});


const likidite = 1;

function secme(userinput) {
    if(userinput == 1 ) {
        console.log("likidite ekleme secildi.");
    }
    
    else if(userinput == 2){
        console.log("swap islemi secildi");
    }
    else if(userinput == 3){
        console.log("havuz durumu görüntüleniyor");
    }
    else if(userinput == 4){
        console.log("kullanici bakiyesi görüntleniyor");
    }
    else if(userinput == 5){
        console.log("cüzdandan cikiliyor");
    }
    else{
        console.log("secim gecerli degil uygulama kapatiliyor tekrar deneyiniz3.2.1..");
        setTimeout(() => {
            console.log();
        }, 3000);
        
        process.exit();
    }
}
*/

const admin = require('firebase-admin');
const fs = require('fs');

// Firebase Admin SDK'yı başlatma
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-eff6e7fe3f.json'); // İndirdiğiniz JSON dosyası
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'homework-1-44305.firebasestorage.app', // Firebase projenizin bucket adı
});

const bucket = admin.storage().bucket();

// Dosya okuma ve token değerini artırma fonksiyonu
async function readAndUpdateToken(filePath) {
  try {
    const file = bucket.file(filePath);
    const [content] = await file.download();
    let data = content.toString(); // Dosya içeriği string olarak alınır

    console.log('Orijinal dosya içeriği:');
    console.log(data);

    // "token:" kısmını bulup değerini artırma
    let tokenMatch = data.match(/tokenA: \s*(\d+)/);
    
    if (tokenMatch) {
      // Token değerini bulduktan sonra artırma
      let currentTokenValue = parseInt(tokenMatch[1], 10); // Eski token değerini al
      let newTokenValue = currentTokenValue + 100; // 100 ekleyelim


      // Yeni dosya içeriğini oluşturma
      const updatedData = data.replace(`tokenA: ${tokenMatch[1]}`, `tokenA: ${newTokenValue}`);
      
      console.log('Güncellenmiş dosya içeriği:');
      console.log(updatedData);

      // Güncellenmiş içeriği Firebase Storage'a kaydetme
      await file.save(updatedData);
      console.log('Dosya başarıyla güncellendi!');
    } else {
      console.log('Token bilgisi dosyada bulunamadı!');
    }

  } catch (error) {
    console.error('Dosya okuma veya yazma sırasında hata oluştu:', error);
  }
}

// Dosya yolunu belirtin
readAndUpdateToken('veriler/veri.txt');





    

    