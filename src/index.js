function sum(a,b){
  return a+b;
}

console.log(sum(22,22))
console.log(sum(22,33))
console.log(sum(22,66))

import Img from "./images/iamge-1.jpg"


const Image =document.createElement('img')


Image.src=Img;


const container=document.createElement('div');

container.appendChild(Image)

document.body.append(container)