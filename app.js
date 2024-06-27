
//Displays the original image after being uploaded
function displayOriginalImage(event) {
  if (event.files.length != 0) {
    if (checkFileName(event.files[0].name)) {
      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);
      document.getElementById("originalImage").style.display = "initial";
      document.getElementById("transformation").style.display = "initial";
      document.getElementById("result").style.display = "none";
    }
  }
}

//Makes sure the uploaded file is a png or jpg image 
function checkFileName(fileName) {
  if (fileName == "") {
    alert("Browse to upload a valid File with png or jpg extension");
    return false;
  }
  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")
    return true;
  else {
    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");
    return false;
  }
}

//Displays the corresponding form to the selected transformation and hides the other forms
function showTransformForm() {
  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");
  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");
  const increaseContrastForm = document.getElementById("increaseContrastForm");
  const decreaseContrastForm = document.getElementById("decreaseContrastForm"); 
  const inverseForm = document.getElementById("inverseForm");
  //Write your code here for the other forms

  const mylist = document.getElementById("myList");

  //Storing the type chosen in a variable
  transformType = mylist.options[mylist.selectedIndex].text;

  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type
  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;

  if (transformType == "Increase Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "initial";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";
    
  } else if (transformType == "Decrease Brightness") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "initial";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";


  } else if (transformType == "Increase Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "initial";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "none";


  } else if(transformType == "Decrease Contrast") {
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "initial";
    document.getElementById("inverseInputs").style.display = "none";

  }else{
    document.getElementById("increaseBrightnessInputs").style.display = "none";
    document.getElementById("decreaseBrightnessInputs").style.display = "none";
    document.getElementById("increaseContrastInputs").style.display = "none";
    document.getElementById("decreaseContrastInputs").style.display = "none";
    document.getElementById("inverseInputs").style.display = "initial";
  }

  // Listener to the event of submiting the increase brightness form
  increaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib1 = document.getElementById("ib1").value
    increaseBrightness(Number(ib1))
  });
  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function
  decreaseBrightnessForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var ib2 = document.getElementById("ib2").value
    decreaseBrightness(Number(ib2))
  });
  increaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var x1 = document.getElementById("Obdf1").value        
    var x2 = document.getElementById("Odbf1").value                                               
    var x3 = document.getElementById("Tbdf1").value                                                
    var x4 = document.getElementById("Tdbf1").value                                              
    Contrastfunction(Number(x1),Number(x2),Number(x3),Number(x4))
  });
   decreaseContrastForm.addEventListener("submit", (e) => {
    e.preventDefault()
    var x11 = document.getElementById("Obdf2").value        
    var x22 = document.getElementById("Odbf2").value                                               
    var x33 = document.getElementById("Tbdf2").value                                                
    var x44 = document.getElementById("Tdbf2").value                                                
    Contrastfunction(Number(x11),Number(x22),Number(x33),Number(x44))
  });
  inverseForm.addEventListener("submit", (e) => {
    e.preventDefault()
    inverse();
  });

  //Applies pixel-wise transformations to increase brightness
  function increaseBrightness(ib1) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;
    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = rgba[i] + ib1;
      if (val > 255) {
        val = 255;
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);

  }
 //Write your code here for three more functions for the other transformations

 //Applies pixel-wise transformations to decrease brightness
  function decreaseBrightness(ib2) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;
    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if (rgba[i] <= ib2) {
        val = 0;
      }
      else{
        val = ((255*(rgba[i]-ib2))/(255-ib2));
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx); 
  }

   //Applies pixel-wise transformations to increase contrast
   //Applies pixel-wise transformations to decrease contrast
  function Contrastfunction(x1,x2,x3,x4) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;
    var slope;
    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if (rgba[i] >= 0 && rgba[i] <= x1) {
        slope = (x3/x1);
        val = (rgba[i]*slope);
      }
      else if(rgba[i] >= x1 && rgba[i] <= x2){
       slope =  ((x4-x3)/(x2-x1));
       val = (((rgba[i]-x1)*slope)+x3);  
      }
      else{
        slope = ((255-x4)/(255-x2));
        val =  (((rgba[i]-x2)*slope)+x4);
      }
       if(val > 255){
         val = 255;
       }
       if(val < 0){
         val = 0;
       }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx); 
  }

  

  
 //Applies pixel-wise transformations to inverse
  function inverse() {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');

    var transformedImage = [];
    var val;
    rgba = getRGBAValues(img, canvas, ctx);
    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = ((-1*rgba[i]) + 255) 
      transformedImage.push(val, val, val, rgba[i + 3]);
    }
    displayResultImage(img, transformedImage, ctx); 
  }

 
  //Extracts rgba 1D array of all the pixels in the original image
  function getRGBAValues(img, canvas, ctx) {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    var rgba = ctx.getImageData(
      0, 0, img.width, img.height
    ).data;
    return rgba;
  }

  //Displays the transformed image
  function displayResultImage(img, transformedImage, ctx) {
    //Get a pointer to the current location in the image.
    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h
    //Wrap your array as a Uint8ClampedArray
    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.
    //Repost the data.
    ctx.putImageData(palette, 0, 0);
    document.getElementById("result").style.display = "initial";
  }
}  