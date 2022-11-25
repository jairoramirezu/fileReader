const DropArea = document.querySelector(".dropArea");
const BarLoad = document.querySelector(".barLoad");
const Result = document.querySelector(".result");
const Input = document.querySelector(".input");

DropArea.addEventListener("dragover", e => {
  e.preventDefault();
  changeStyle(e.target, "blue");
})

DropArea.addEventListener("dragleave", e => {
  e.preventDefault();
  changeStyle(e.target,"#BF0426");
})

DropArea.addEventListener("drop", e => {
  e.preventDefault();
  changeStyle(e.target,"blue");
  loadFile(e.dataTransfer.files);
})

Input.addEventListener("change", ()=> {
  loadFile(Input.files);
})

const changeStyle = (obj, color) => {
  obj.style.color = color;
  obj.style.border = `2px dashed ${color}`;
}

const loadFile = ar => {
  for (let i = 0; i < ar.length; i++) {
    const reader = new FileReader();
    if (ar[i].type.includes("text")) {
      reader.readAsText(ar[i]);
      reader.addEventListener("load", e => {
        Result.innerHTML += `</br>${e.currentTarget.result}</br>` ;
      })
    } else if (ar[i].type.includes("image")) {
      reader.readAsDataURL(ar[i]);
      reader.addEventListener("load", ()=> {
        let url = URL.createObjectURL(ar[i]);
        let img = document.createElement("img");
        img.setAttribute("src",url);
        Result.appendChild(img);
      })
    } else if (ar[i].type.includes("video")) {
      reader.readAsArrayBuffer(ar[i]);
      reader.addEventListener("load", e => {
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let vid = document.createElement("video");
        vid.setAttribute("src",url);
        vid.setAttribute("autoplay", "autoplay");
        vid.setAttribute("controls", "controls");
        Result.appendChild(vid);
      })
    }
    reader.addEventListener("progress", e => {
      let load = Math.round((e.loaded / ar[i].size) *100);
      if (load < 100) {
        DropArea.innerHTML = `${load}%`;
        DropArea.classList.add("active");
      } else {
        DropArea.classList.remove("active");
        DropArea.innerHTML = "¡Files dropped! ✅";
        setTimeout(() => {
          DropArea.innerHTML = "¡Drop more files here! 👇";
          DropArea.style.color = "var(--white)";
          DropArea.style.border = "2px dashed var(--white)";
        }, 1200)
      }
    })
  }
}