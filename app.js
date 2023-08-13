import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, uploadBytes , uploadBytesResumable, getDownloadURL  , deleteObject } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyB-vVR_EAFuRyrRPgH6s71CG0vMbW4Q3Iw",
  authDomain: "newproject-34441.firebaseapp.com",
  projectId: "newproject-34441",
  storageBucket: "newproject-34441.appspot.com",
  messagingSenderId: "119028362142",
  appId: "1:119028362142:web:ebdce886a33e238e3d848f",
  measurementId: "G-LDC4REWHN9"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

const uploadFile =(file)=>{
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
    
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            reject("error-->" , error)
          }, 
          () => {
          
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve( downloadURL);
            });
          }
        );
            
    })
    }

const upload = document.getElementById("uplod")
upload.addEventListener('click' , async()=>{
    try{

        let file = document.getElementById("file");
       const res  = await uploadFile(file.files[0])
       console.log("res-->" ,res)
       const img = document.getElementById("img")
       img.src = res;
    } catch(err){
console.log(err);
}
});

const del = document.getElementById("del")
del.addEventListener('click' , ()=>{
    const desertRef = ref(storage, 'images/faisal.jpg');

deleteObject(desertRef).then((res) => {
  console.log("res-->" , res);
}).catch((error) => {
console.log(error);
});
})