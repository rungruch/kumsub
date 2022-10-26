
//our input tag
let inputData = document.getElementById("inputSearch");
//where the output get appears
let outputData = document.getElementById("outputPara");
// button which gives results on clicking
let resultBtn = document.getElementById("search");
//to get the prenounciation
let prenounciationArea = document.getElementById("audio");
//when no result is found :
let noResultFound = document.getElementById("no-result");
//our api key :
const ourAPIkey = "b806881b-0e5f-4e8e-ad96-462d96ef4fc0";
//our loading spinner
let showLoadingSpinner = document.querySelector(".spinnerLoading");
//output section
let outputSection = document.querySelector(".output");

let imageapi= document.getElementById("showpicture");

//our input tag
//let inputData2 = document.getElementById("inputSearch2");
// button which gives results on clicking
//let resultBtn2 = document.getElementById("search2");
let saveword_button_th = document.getElementById("saveword_button_th");
let saveword_button_en = document.getElementById("saveword_button_en");
let outputaudio = document.getElementById("outputaudio");
let title_word = document.getElementById("title_word");
let line = document.getElementById("line");
let foreground = document.getElementById("foreground");
let bookmark_th = document.getElementById("bookmark_th");
let bookmark_en = document.getElementById("bookmark_en");
let bookmark_title = document.getElementById("bookmark_title");
let bm_title_word_th = document.getElementById("bm_title_word_th");
let bm_title_word_en = document.getElementById("bm_title_word_en");
let list = document.getElementById("list");
// resultBtn2.addEventListener("click", giveResultsOfWord2);
// function giveResultsOfWord2(e) {
//   //after searching for once it shows the previous searched values so first clear them everytime
//   outputData2.innerText = "";
//   outputData.innerText = "";
//   prenounciationArea.innerHTML = "";
//   noResultFound.innerText = "";
//   e.preventDefault();
//   // ..first get the input which user types
//   let wordTyped = inputData2.value;
//   //alert(wordTyped);
//   if (wordTyped === "") {
//     alert("Please Type Something..");
//     return;
//   }
//   //get data from the api via function
//   getData2(wordTyped);
// }



function getData2(wordTyped) {
  //to check the progress of data
  outputSection.style.display = "block";
  showLoadingSpinner.style.display = "flex";
      //alert("in");
   
      // alert(name+' '+year);
       // search student by name and year param and set hyperlink to info of student
   
       const xhttp = new XMLHttpRequest();
       xhttp.onload = function(){
       let json = this.responseText;
       if(!Object.keys(json).length){
        try {
          showLoadingSpinner.style.display = "none";
        }
        finally {
          outputData.innerHTML = `&rarr; <strong>ไม่พบผลลัพธ์</strong> <br> กรุณาพิมคำที่มีความหมาย`;
        }
        return;
    }
       let ressuts = JSON.parse(json);
       
       let count = 0 ;
       let outbool = 0;
       while (ressuts[count]) {
           count++;
       }
       //หาคำที่มี1ความหมาย
       for(let c = 0;c<count;c++){
        let tmp = ressuts[c][0];
        //tmp = tmp.slice(0, -2);   // console.log(tmp);   //console.log(tmp.includes(wordTyped)); //  console.log(ressuts[c]) //  console.log(tmp === (wordTyped));
        if(tmp === (wordTyped)){
          showLoadingSpinner.style.display = "none";
         // console.log(ressuts[c]);
          let tmp2 = outputData.innerHTML;
          outputData.innerHTML = tmp2+'\n'+ressuts[c];
          outbool++;
        }
       }
      //หาคำที่มีมากกว่า 1 ความหมาย
      if (outbool == 0){
        for(let c = 0;c<count;c++){
          let tmp = ressuts[c][0];
          tmp = tmp.slice(0, -2);
          // console.log(tmp);   //console.log(tmp.includes(wordTyped));   // console.log(ressuts[c]);   //console.log(tmp === (wordTyped));
          if(tmp === (wordTyped)){
            showLoadingSpinner.style.display = "none";
        //    console.log(ressuts[c]);
            let tmp2 = outputData.innerHTML;
            outputData.innerHTML = tmp2+'<br>'+ressuts[c];
            outbool++;
          }
         }

       }

       if (outbool == 0){
        //หาคำไกล้เคียง case (sprint อื่น)
        showLoadingSpinner.style.display = "none";
        outputData.innerHTML = `&rarr; <strong>ไม่พบผลลัพธ์</strong>`;
        return;
     }
    showLoadingSpinner.style.display = "none";
    foreground.style.display= "block";
     title_word.innerHTML= wordTyped;
     line.style.display = "block";
     giveSoundth(wordTyped);
     //saveword_button_th.style.display = "block";
     showimage2(wordTyped);
     saveword_th();
        

          
        
   }
       xhttp.open("GET","/getlongdo/"+wordTyped);
       xhttp.send()



    

}

function clearoutput() {
  outputData.innerText = "";
  noResultFound.innerText = "";
  line.style.display = "none";
  title_word.innerHTML= "";
  imageapi.innerHTML="";
 outputaudio.style.display ="none";
 saveword_button_th.style.display = "none";
 saveword_button_en.style.display = "none";
 bookmark_th.innerText="";
 bookmark_en.innerText="";
 bm_title_word_th.style.display = "none";
 bm_title_word_en.style.display = "none";
}

//event listeners after clicking on resultBtn
resultBtn.addEventListener("click", giveResultsOfWord);
function giveResultsOfWord(e) {
  
  //after searching for once it shows the previous searched values so first clear them everytime
  var list= document.getElementById("list").value;
  clearoutput();
  e.preventDefault();
  
  // ..first get the input which user types
  let wordTyped = inputData.value; 
  //alert(wordTyped);
  if (wordTyped === "") {
    alert("Please Type Something..");
    return;
  }
  if(list==1)
  {
    getData(wordTyped);
  }
  else if(list ==2 )
  {
    getData2(wordTyped);
  }
  
  //get data from the api via function
  //getData(wordTyped);


}




function getData(wordTyped) {
  //to check the progress of data
  showLoadingSpinner.style.display = "flex";
  outputSection.style.display = "block";
  const xhr = new XMLHttpRequest();
  //to get the items from this api
  xhr.open(
    "GET",
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${wordTyped}?key=${ourAPIkey}`,
    true
  );
  //main  program to load the content from the API
  xhr.onload = function () {
    const parsedData = JSON.parse(this.responseText);
    if (!parsedData.length) {
      showLoadingSpinner.style.display = "none";
      outputData.innerHTML = `&rarr; <strong>No Result Found</strong> , Please Type Something Meaningfull ... `;
      return;
    }
    // //if result in not in the parsedData then give some auto suggestions via api
    if (typeof parsedData[0] === "string") {
      showLoadingSpinner.style.display = "none";
      let notFound = document.createElement("h4");
      notFound.className = "notFoundMessage";
      notFound.innerHTML = `Sorry,There is No Match Found Similar to <span style="color:#0a6b65be;">${wordTyped}</span>.<br>I Have Found Some Results Similar To The Word You Typed.Please Have a Look !`;
      noResultFound.appendChild(notFound);
      parsedData.forEach((suggestions) => {
        let newSpan = document.createElement("span");
        newSpan.className = "display-suggestions";
        newSpan.innerText = suggestions;
        noResultFound.appendChild(newSpan);
      });
      return;
    }
    showLoadingSpinner.style.display = "none";

    try {
      outputData.innerHTML = ` <strong>Meaning of <span style="color:#0a6b65be;">${wordTyped}</span> : </strong> ${parsedData[0].shortdef[0]} <br><br> Pronunciation in Text : ${parsedData[0].hwi.prs[0].ipa} <br><br> Part Of Speech: ${parsedData[0].fl}`;
    } catch (error) {
      outputData.innerHTML = `&rarr; <strong>No Result Found</strong> , Please Type Something Meaningfull ... `;
      return;
    }
    foreground.style.display= "block";
    line.style.display = "block";
    title_word.innerHTML= wordTyped;
   // saveword_button_en.style.display = "block";
    //check whether the prenounciation sound is present or not
    showimage(wordTyped);
    saveword_en();
    try {
      const audio = parsedData[0].hwi.prs[0].sound.audio;
      if (audio) {
        giveSound(audio);
       
      }
    }
    catch(err) {
      giveSound_en(wordTyped);
    }

  
    console.log(parsedData);
  };
  //send the request to the server
  xhr.send();
}

function getPhotos(images) {
   images.map(image => {
    imageapi.innerHTML=`<br><br><img src="${image.src.tiny}" class="outputimage">`
   })
}

function showimage(wordTyped)
{
  const xhr= new XMLHttpRequest();
  xhr.open("GET",`https://api.unsplash.com/search/photos/?client_id=mLw31hbioTDcgKVkG9xixBkv3AY21ESo3vTd_z79cyk&page1&query=${wordTyped}`);
  xhr.onload=function()
  {
    let iMage=this.responseText;
    iMage=JSON.parse(iMage);
    if(iMage.results.length == 0){
      alert("No image to show on display!!!");
    } else {
      let imageshow = iMage.results[0].urls.raw;
     // console.log(iMage.results[0]);
     imageapi.innerHTML=`<br><br><img src="${imageshow}" class="outputimage" >`
    }

    
  }
  xhr.send();

}

function showimage2(wordTyped)
{
  
  fetch(`https://api.pexels.com/v1/search?query=${wordTyped}&locale=th-TH`,{
  headers: {
    Authorization: "563492ad6f91700001000001176416596be647ddbf9cfa76f8eb44a9"
  }
})
   .then(resp => {
    return resp.json()
   })
   .then(data => {
  //  console.log(data.photos);
    getPhotos(data.photos);
   })
   
}

function playsound_eng() { 
  var playbutton_eng = document.getElementById("engaudio"); 
  playbutton_eng.play(); 
}




//get the sound / prenounciation
function giveSound(audio) {//primary api eng sound
  let subfolderOfWord = audio.charAt(0);
  let soundLocated = `https://media.merriam-webster.com/soundc11/${subfolderOfWord}/${audio}.wav?key=${ourAPIkey}`;
  let getAudio = document.createElement("audio");
  prenounciationArea.innerHTML = '<audio id="engaudio" src="'+ soundLocated+'"></audio> ';
  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="playsound_eng();"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;

}


//get the thai sound / prenounciation
function giveSoundth(wordTyped) {

  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="responsiveVoice.speak(' `+wordTyped+`', 'Thai Female');"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;
 
}


function giveSound_en(wordTyped) { //secondary api eng sound
  outputaudio.style.display ="block";
  outputaudio.innerHTML = `<button id="play_btn"  onclick="responsiveVoice.speak(' `+wordTyped+`', 'UK English Female');"
class='audio' style='font-size:30px'; type="button" value="Play"><img src="/resources/volume.png"></img></button>`;
 
}


//saveword_button_th.addEventListener("click", saveword_th);
function saveword_th() {
  let thaiword = JSON.parse(localStorage.getItem('thaiword'));
  
  if (thaiword === null) {//firstword
    thaiword=[];
    thaiword.push(title_word.innerHTML);
    localStorage.setItem("thaiword", JSON.stringify(thaiword));
  } else {
    if(thaiword.length > 24){thaiword.shift();}
   for(var word in thaiword){
     if (thaiword[word] === title_word.innerHTML){
       return;
      }
 } 
    thaiword.push(title_word.innerHTML);
     localStorage.setItem("thaiword", JSON.stringify(thaiword));
  }
}



//saveword_button_en.addEventListener("click", saveword_en);
function saveword_en() {
  let engword = JSON.parse(localStorage.getItem('engword'));
 
  if (engword === null ) {//firstword
     engword = [];
     engword.push(title_word.innerHTML);
    localStorage.setItem("engword", JSON.stringify(engword));

  } else {
    if(engword.length > 24){engword.shift();}
  for(let word in engword){
    if (engword[word] === title_word.innerHTML){
      return;
     }
} 
    engword.push(title_word.innerHTML); 
    localStorage.setItem("engword", JSON.stringify(engword));
  

  }

}




let history = document.getElementById("history");
history.addEventListener("click", showbookmark);
function showbookmark(e) {
  clearoutput();
  //showLoadingSpinner.style.display = "flex";
  outputSection.style.display = "block";
  foreground.style.display= "block";
  title_word.innerHTML= "ประวัติการค้นหา";



let thaiword = JSON.parse(localStorage.getItem('thaiword'));

if (!(thaiword === null)) {
  bm_title_word_th.style.display = "block";
  line.style.display = "block";
  thaiword.forEach((words) => {
    let newSpan = document.createElement("button");
    newSpan.className = "display-bookmark";
    newSpan.innerText = words;
    newSpan.onclick = function() {
      clearoutput();
      getData2(words);}
      bookmark_th.appendChild(newSpan);
  
  });

}

//showLoadingSpinner.style.display = "none";
//let notFound = document.createElement("h4");
//notFound.className = "notFoundMessage";
//notFound.innerHTML = `Sorry,There is No Match Found Similar to <span style="color:#0a6b65be;"></span>.<br>I Have Found Some Results Similar To The Word You Typed.Please Have a Look !`;
//noResultFound.appendChild(notFound);



let engword = JSON.parse(localStorage.getItem('engword'));

if (!(engword === null)){
  bm_title_word_en.style.display = "block";
  engword.forEach((words) => {
  let newSpan = document.createElement("button");
  newSpan.className = "display-bookmark";
  newSpan.innerText = words;
  newSpan.onclick = function() {
    clearoutput();
    getData(words);}

    bookmark_en.appendChild(newSpan);

});
}

}

var english = /^[a-z][a-z]*$/i;
function lancheck(){
  let tmp = inputData.value; 
  if(english.test(tmp.charAt(0))){
    list.value = '1';
  }else{list.value='2';}
  
}

