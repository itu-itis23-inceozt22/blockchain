console.log("1.Likidite Ekle.");
console.log("2.Swap");
console.log("3.Havuz durumunu Görüntüle");
console.log("4.Kullanici bakiyesinşi görüntüle");
console.log("5.Çikis.");

const readline = require('readline');

// readline'ı dışarıda tanımlıyoruz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Promise ile readline'ı sarmalayarak, async/await kullanacağız
function soruSor(sozlukSorusu) {
    return new Promise((resolve) => {
        rl.question(sozlukSorusu, (cevap) => {
            resolve(cevap); // Cevabı çözümle
        });
    });
}



  async function secme() {
    const veri = await soruSor("Yapmak istediğiniz işlemin numarasını giriniz: ");
    if(veri == 1 ) {
        likidite_ekle();        
    }
    
    else if(veri == 2){
        swap();
    }
    else if(veri == 3){
        havuz_bakiye_göster();
    }
    else if(veri == 4){
        kullanici_bakiyesini_yazdir();
    }
    else if(veri == 5){
        cikis();
    }
    else{
        console.log("secim gecerli degil uygulama kapatiliyor tekrar deneyiniz3.2.1..");
        setTimeout(() => {
            console.log();
        }, 3000);
        
        process.exit();
    }
}
secme();

async function likidite_ekle() {
    //kullanıcı ve havuz bilgilerini göster.
   
    //kullanıcıdan likidite eklmek istediği tokenı al
     const likidite_token = await soruSor("likidite eklemek istediğiniz tokenı seçiniz(A veya B?):");
  
      // ekleme miktarını al
        let likidite_miktar = await soruSor("ne kadar eklemek istiyorsunuz?:");
        let likidite_num =parseInt(likidite_miktar , 10);

        
      const admin = require('firebase-admin'); //firebase
      const fs = require('fs');

// Firebase Admin SDK'yı başlatma
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-d654ed210f.json'); // İndirdiğiniz JSON dosyası
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

    // değiştirilecek kısmı bulup değerini artırma
      if (likidite_token === "A") {
        let tokenMatch = data.match(/kullanıcı_tokenA: \s*(\d+)/);
        let diger_token =data.match(/havuz_tokenA: \s*(\d+)/);

      // Token değerini bulduktan sonra artırma
      let currentTokenValue = parseInt(tokenMatch[1], 10); // Eski token değerini al
      let diger_token_current =parseInt(diger_token[1], 10);
      
      let newTokenValue = currentTokenValue - likidite_num; //kullanıcıdan değeri düşme
      let diger_token_new_value=diger_token_current + likidite_num;//değerin havuza eklenmesi
      
      //dosya içeriğini güncelleme
      let updatedData = data.replace(`tokenA: ${tokenMatch[1]}`, `tokenA: ${newTokenValue}`);
      updatedData = updatedData.replace(`havuz_tokenA: ${diger_token[1]}`,`havuz_tokenA: ${diger_token_new_value}`);
     
      console.log('Güncellenmiş cüzdan:');
      console.log(updatedData);

      // Güncellenmiş içeriği Firebase Storage'a kaydetme
      await file.save(updatedData);
      console.log('cüzdan başarıyla güncellendi!');

      anamenü();

    } 
    else if(likidite_token === "B") {
        let tokenMatch_2 = data.match(/kullanıcı_tokenB: \s*(\d+)/);
        let diger_token_2 =data.match(/havuz_tokenB: \s*(\d+)/);

          // Token değerini bulduktan sonra artırma
          let currentTokenValue_2 = parseInt(tokenMatch_2[1], 10); // Eski token değerini al
          let diger_token_current_2 =parseInt(diger_token_2[1], 10);
          let newTokenValue_2 = currentTokenValue_2 - likidite_num; // 

          let diger_token_new_value_2 = diger_token_current_2 + likidite_num;

          // Yeni dosya içeriğini oluşturma
          let updatedData = data.replace(`kullanıcı_tokenB: ${tokenMatch_2[1]}`, `kullanıcı_tokenB: ${newTokenValue_2}`);
          updatedData = updatedData.replace(`havuz_tokenB: ${diger_token_2[1]}` , `havuz_tokenB: ${diger_token_new_value_2}`);
        
          console.log('Güncellenmiş cüzdan:');
          console.log(updatedData);
    
          // Güncellenmiş içeriği Firebase Storage'a kaydetme
          await file.save(updatedData);
          console.log('cüzdan başarıyla güncellendi!');
          anamenü();
    }else {
      console.log('Token bilgisi dosyada bulunamadı!');
      anamenü();
    }

  } catch (error) {
    console.error('Dosya okuma veya yazma sırasında hata oluştu:', error);
  }

}

      // Dosya yolunu belirtin
      readAndUpdateToken('veriler.txt');
}

async function anamenü(){
  const ana_menü = await soruSor("Ana menüye dönmek için 'Y' çıkış için 'N' ye basınız.");
        if(ana_menü === "Y"){
          console.log("1.Likidite Ekle.");
          console.log("2.Swap");
          console.log("3.Havuz durumunu Görüntüle");
          console.log("4.Kullanici bakiyesinşi görüntüle");
          console.log("5.Çikis.");
            secme();
        }
        else if(ana_menü === "N"){
            console.log("cüzdan kapatiliyor 3.2.1..");
        setTimeout(() => {
            console.log();
        }, 3000);
        
        process.exit();

        }
        else {
            console.log("seçim geçerli değil cüzdan kapatılıyor 3.2.1...:");
            setTimeout(() => {
                console.log();
            }, 3000);
            process.exit();
        }

}


async function swap() {
    
    //değiştirilmek istenen tokenı al
    const swap_token = await soruSor("değiştirmek istediğiniz token nedir?:");

    //ne kadar değiştirmek istediğini sor 
    const swap_token_miktar = await soruSor("değiştirmek istediğiniz token miktarı nedir?:");

    let swap_token_miktar_value = parseInt(swap_token_miktar , 10);
  
    const admin = require('firebase-admin');
    const fs = require('fs');

// Firebase Admin SDK'yı başlatma
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-d654ed210f.json'); // İndirdiğiniz JSON dosyası
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

    // gerekli kısmı bulup değerini değiştirmre
    
    if (swap_token === "A") {
      // Token değerini bulduktan sonra artırma
      let swaptoken = data.match(/kullanıcı_tokenA: \s*(\d+)/);
      let  swaptoken_2=data.match(/kullanıcı_tokenB: \s*(\d+)/);
    
      let swap_token_value = parseInt(swaptoken[1], 10); // Eski token değerini al
      let swap_token_2_value =parseInt(swaptoken_2[1], 10);
      let new_swap_token_value = swap_token_value - swap_token_miktar_value; // tokenA dan değeri düş
      let new_swap_token_2_value=swap_token_2_value + swap_token_miktar_value; //tokenB ye değeri ekle

      // Yeni dosya içeriğini oluşturma
      let updatedData = data.replace(`kullanıcı_tokenA: ${swaptoken[1]}`, `kullanıcı_tokenA: ${new_swap_token_value}`, );
      updatedData = updatedData.replace(`kullanıcı_tokenB: ${swaptoken_2[1]}` , `kullanıcı_tokenB: ${new_swap_token_2_value}`);

      console.log('Güncellenmiş cüzdan:');
      console.log(updatedData);

      // Güncellenmiş içeriği Firebase Storage'a kaydetme
      await file.save(updatedData);
      console.log('cüzdan başarıyla güncellendi!');
      anamenü();
    }
    else if(swap_token === "B"){
        // Token değerini bulduktan sonra artırma
        let swaptoken_3 = data.match(/kullanıcı_tokenA: \s*(\d+)/);
        let  swaptoken_4=data.match(/kullanıcı_tokenB: \s*(\d+)/);
      
        let swap_token_3_value = parseInt(swaptoken_3[1], 10); // Eski token değerini al
        let swap_token_4_value =parseInt(swaptoken_4[1], 10);
        let new_swap_token_4_value = swap_token_4_value - swap_token_miktar_value; // tokenB den değeri düş
        let new_swap_token_3_value=swap_token_3_value + swap_token_miktar_value; // tokenA ya değeri ekle
  
  
        // Yeni dosya içeriğini oluşturma
        let updatedData = data.replace(`kullanıcı_tokenA: ${swaptoken_3[1]}`, `kullanıcı_tokenA: ${new_swap_token_3_value}`, );
        updatedData = updatedData.replace(`kullanıcı_tokenB: ${swaptoken_4[1]}` , `kullanıcı_tokenB: ${new_swap_token_4_value}`);
  
        console.log('Güncellenmiş cüzdan:');
        console.log(updatedData);
  
        // Güncellenmiş içeriği Firebase Storage'a kaydetme
        await file.save(updatedData);
        console.log('cüzdan başarıyla güncellendi!');
        anamenü();
    } else {
      console.log('Token bilgisi dosyada bulunamadı!');
      anamenü();
    }

  } catch (error) {
    console.error('Dosya okuma veya yazma sırasında hata oluştu:', error);
  }
}

      // Dosya yolunu belirtin
      readAndUpdateToken('veriler.txt');
    
}

function havuz_bakiye_göster() {
    //havuzda bulunan güncel bakiyeyi yazdır

    const admin = require('firebase-admin');
    const fs = require('fs');

// Firebase Admin SDK'yı başlatma
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-d654ed210f.json'); // İndirdiğiniz JSON dosyası
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'homework-1-44305.firebasestorage.app', // Firebase projenizin bucket adı
});

const bucket = admin.storage().bucket();

// Dosyadaki belirli bir veriyi okuma fonksiyonu
async function readSpecificLine(filePath, lineNumber) {
    try {
      // Dosyayı indirme
      const file = bucket.file(filePath);
      const [content] = await file.download();
      let data = content.toString(); // Dosya içeriğini string olarak alın
  
      // Dosyayı satırlara ayırma
      const lines = data.split('\n'); // '\n' ile satırlara ayırma (her satır yeni bir dizi elemanı olur)
  
      // Belirtilen satırı almak
      if (lineNumber > 0 && lineNumber <= lines.length) {
        console.log(lines[lineNumber - 1]);
        anamenü();
      } else {
        console.log('Geçersiz satır numarası!');
        anamenü();
      }
  
    } catch (error) {
      console.error('Dosya okuma sırasında hata oluştu:', error);
    }
  }
  
  // Örnek kullanım: 'veriler.txt' dosyasının 1. satırını okuma
  readSpecificLine('veriler.txt', 1);
}

function kullanici_bakiyesini_yazdir() {
    //kullanıcı bakiyesini göster

    const admin = require('firebase-admin');
    const fs = require('fs');

// Firebase Admin SDK'yı başlatma
const serviceAccount = require('./homework-1-44305-firebase-adminsdk-a2y1e-d654ed210f.json'); // İndirdiğiniz JSON dosyası
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'homework-1-44305.firebasestorage.app', // Firebase projenizin bucket adı
});

const bucket = admin.storage().bucket();

// Dosyadaki belirli bir veriyi okuma fonksiyonu
async function readSpecificLine(filePath, lineNumber) {
    try {
      // Dosyayı indirme
      const file = bucket.file(filePath);
      const [content] = await file.download();
      let data = content.toString(); // Dosya içeriğini string olarak alın
  
      // Dosyayı satırlara ayırma
      const lines = data.split('\n'); // '\n' ile satırlara ayırma (her satır yeni bir dizi elemanı olur)
  
      // Belirtilen satırı almak
      if (lineNumber > 0 && lineNumber <= lines.length) {
        console.log( lines[lineNumber - 1]);
        anamenü();
      } else {
        console.log('Geçersiz satır numarası!');
        anamenü();
      }
  
    } catch (error) {
      console.error('Dosya okuma sırasında hata oluştu:', error);
    }
  }
  
  // Örnek kullanım: 'veriler.txt' dosyasının 3. satırını okuma
  readSpecificLine('veriler.txt', 3);
  
}

function cikis() {
    console.log("cüzdan kapatılıyor 3.2.1...");
    setTimeout(() => {
        console.log();
    }, 3000);
    
    process.exit();
}
