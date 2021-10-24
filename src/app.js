/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {};

//CONSTANTES Y VARIABLES

const ROW = document.querySelector("section");
const FORM = document.querySelector("form");
const INPUT = document.querySelector("#inputcard");
const BTN = document.querySelector("#sort-btn");

const SYMBOLCARD = ["♦", "♥", "♠", "♣"];
const CARDNUMBER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

let Cards = [];

//FUNCIONES

function newcard() {
  return {
    number: CARDNUMBER[randomnumber(CARDNUMBER)],
    pattern: SYMBOLCARD[randomnumber(SYMBOLCARD)]
  };
}

function randomnumber(list) {
  return Math.floor(Math.random() * list.length);
}

function draw(object) {
  for (const card of object) {
    let element = document.createElement("div");
    element.classList.add("card");

    ROW.appendChild(element);

    let topcard = document.createElement("div");
    topcard.classList.add("top");
    topcard.innerHTML = card["pattern"];
    element.appendChild(topcard);

    let maincard = document.createElement("div");
    maincard.innerHTML = card["number"];
    element.appendChild(maincard);

    let bottomcard = document.createElement("div");
    bottomcard.classList.add("bottom");
    bottomcard.innerHTML = card["pattern"];
    element.appendChild(bottomcard);

    if (card["pattern"] == "♦" || card["pattern"] == "♥") {
      topcard.classList.add("red");
      maincard.classList.add("red");
      bottomcard.classList.add("red");
    } else {
      topcard.classList.add("black");
      maincard.classList.add("black");
      bottomcard.classList.add("black");
    }
  }
}

//EVENTOS

FORM.addEventListener("submit", e => {
  e.preventDefault();
  ROW.innerHTML = "";
  Cards = [];
  for (let index = 0; index < INPUT.value; index++) {
    Cards.push(newcard());
  }
  draw(Cards);
  console.log(Cards);
});

BTN.addEventListener("click", e => {
  e.preventDefault();
  let min = 0;
  while (min < Cards.length - 1) {
    for (let i = min + 1; i < Cards.length; i++) {
      if (Cards[min].number > Cards[i].number) {
        let aux = Cards[min].number;
        let typecard = Cards[min].pattern;
        Cards[min].number = Cards[i].number;
        Cards[min].pattern = Cards[i].pattern;
        Cards[i].number = aux;
        Cards[i].pattern = typecard;
      }
    }
    min++;
  }
  ROW.innerHTML = "";
  draw(Cards);
});
