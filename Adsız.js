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
const path = require('path');

// Servis hesabı JSON dosyasının yolu
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-6915be034c.json');

// Firebase Admin SDK'yı başlat
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://homework-1-44305.firebasestorage.app/veriler', // Storage bucket adı
});

// Storage referansı
const bucket = admin.storage().bucket();

// Dosya yolunu tanımla
const filePath = 'https://firebasestorage.googleapis.com/v0/b/homework-1-44305.firebasestorage.app/o/veriler%2Fveri.txt?alt=media&token=a104b646-c579-4fbd-a7d1-b17657c53706';

// Geçici bir yerel dosyaya indir ve içeriğini oku
bucket.file(filePath).download((err, contents) => {
  if (err) {
    console.error('Dosya indirilemedi:', err);
    return;
  }

  // İçeriği yazdır
  console.log('Dosya içeriği:');
  console.log(contents.toString());
});




    

    