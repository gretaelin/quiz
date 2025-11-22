// data/questions.ts

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Čo sú konejšivé signály u psa?",
    options: [
      "Signály, ktorými pes ukazuje, že chce útočiť",
      "Signály, ktorými sa pes snaží upokojiť seba alebo druhého",
      "Signály, ktoré pes používa len pri hre",
      "Signály, ktoré používajú iba šteňatá",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question:
      "Pes si opakovane olizuje ňufák, aj keď neje. Čo to môže znamenať?",
    options: [
      "Je vždy hladný",
      "Je mu zima",
      "Je nervózny alebo sa snaží upokojiť situáciu",
      "Je pripravený na beh",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    question:
      "Pes sa otočí bokom alebo odvracia hlavu od iného psa. Čo tým často komunikuje?",
    options: [
      "Chce sa biť",
      "Ignoruje druhého psa",
      "Chce, aby ho majiteľ pohladkal",
      "Snaží sa upokojiť napätie a ukázať, že nechce konflikt",
    ],
    correctIndex: 3,
  },
  {
    id: 4,
    question: "Zívanie u psa môže byť konejšivý signál najmä vtedy, keď:",
    options: [
      "Práve vstal zo spánku",
      "Je v stresovej situácii alebo napätí",
      "Je po jedle",
      "Počúva povel 'sadni'",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    question:
      "Pes sa pomaly oblizuje a pozerá bokom, keď sa k nemu niekto skláňa. Čo tým môže naznačovať?",
    options: [
      "Že má rád, keď sa nad ním ľudia skláňajú",
      "Že chce okamžite odísť preč",
      "Že je mu to nepríjemné a snaží sa situáciu upokojiť",
      "Že má bolesť zubov",
    ],
    correctIndex: 2,
  },
  {
    id: 6,
    question: "Ktoré správanie môže byť konejšivým signálom medzi psami?",
    options: [
      "Pomalé obchádzanie do oblúka",
      "Priame rýchle vybehnutie k druhému psovi",
      "Dlhotrvajúci priamy pohľad do očí",
      "Štekanie priamo pri tvári druhého psa",
    ],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "Prečo je dôležité, aby človek poznal konejšivé signály psa?",
    options: [
      "Aby vedel psa rýchlejšie unaviť",
      "Aby vedel lepšie čítať, kedy je psovi nepríjemne a predísť konfliktom",
      "Aby naučil psa viac trikov",
      "Aby pes menej žral",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question:
      "Pes si začne čuchať zem, aj keď tam nič nie je, uprostred napätej situácie. Čo to môže byť?",
    options: [
      "Normálne hľadanie pamlsku",
      "Konejšivý signál – presmerovanie pozornosti, upokojenie",
      "Príznak choroby",
      "Nuda",
    ],
    correctIndex: 1,
  },
];
