const DropArea = document.querySelector(".dropArea");
const Result = document.querySelector(".result");

DropArea.addEventListener("dragover", e => {
  e.preventDefault();
  changeStyle(e.target, "#BF0426");
})

DropArea.addEventListener("dragleave", e => {
  e.preventDefault();
  changeStyle(e.target,"#172D44");
})

DropArea.addEventListener("drop", e => {
  e.preventDefault();
  changeStyle(e.target,"#3A8891");
  loadFile(e.dataTransfer.files[0]);
  DropArea.innerHTML = "¡Files dropped!";
})

const changeStyle = (obj, color) => {
  obj.style.color = color;
  obj.style.border = `2px dashed ${color}`;
}

const loadFile = ar => {
  const reader = new FileReader();
  if (ar.type.includes("text")) {
    reader.readAsText(ar);
    reader.addEventListener("load", e => {
      Result.innerHTML += `</br>${e.currentTarget.result}</br>` ;
    })
  } else if (ar.type.includes("image")) {
    reader.readAsDataURL(ar);
    reader.addEventListener("load", ()=> {
      let url = URL.createObjectURL(ar);
      let img = document.createElement("img");
      img.setAttribute("src",url);
      Result.appendChild(img);
    })
  } else if (ar.type.includes("video")) {
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("load", e => {
      let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
      let url = URL.createObjectURL(video);
      let vid = document.createElement("video");
      vid.setAttribute("src",url);
      vid.setAttribute("autoplay", "autoplay");
      vid.setAttribute("controls", "controls");
      Result.appendChild(vid);
      vid.play();
    })
  }
}