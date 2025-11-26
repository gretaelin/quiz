// data/questions.ts

export interface Question {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctIndex: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Čo sa odohráva medzi týmito dvoma psami?",
    image:
      "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/bd18/6116041/0a0d8f497a69/animals-08-00131-g001.jpg",
    options: [
      "Začínajú sa spolu hrať",
      "Samica pozýva mladšieho psa bližšie",
      "Malý pes testuje samicu a situácia je napätá",
      "Oba psy sú úplne uvoľnené",
    ],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "Aký je vzťah medzi týmito dvoma psami?",
    image:
      "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/bd18/6116041/0773f401ba0d/animals-08-00131-g004.jpg",
    options: [
      "Sú napätí a chystajú sa na konflikt",
      "Málo sa poznajú, sledujú sa s nedôverou",
      "Medzi psami je skôr neutrálna interakcia",
      "Psy sú uvoľnené a majú dobrý vzťah",
    ],
    correctIndex: 3,
  },
  {
    id: 3,
    question:
      "Čo znamená správanie, keď jeden pes chytí druhého okolo papule ?",
    image:
      "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/bd18/6116041/c573f7949655/animals-08-00131-g008.jpg",
    options: [
      "Ide o jemné hravé správanie alebo ritualizované správanie",
      "Pes sa chystá zaútočiť",
      "Je to znak extrémneho strachu",
      "Pes sa snaží druhého úplne ignorovať",
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    question: "Čo podľa vás znamená správanie čierneho samca na tomto obrázku?",
    image:
      "https://cdn.ncbi.nlm.nih.gov/pmc/blobs/bd18/6116041/a99f8221ae3f/animals-08-00131-g003.jpg",
    options: [
      "Chce sa hrať",
      "Žiada, aby sa samica priblížila — prejav náklonnosti",
      "Vyjadruje hrozbu a chce dominovať",
      "Je vystrašený",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    question:
      "Pes pri pohľade na teba zdvihne jedno obočie. Čo tým chce povedať?",
    options: [
      "Premýšľa o zmysle života",
      "Zvažuje, či si zaslúžiš jeho pozornosť",
      "Skúma tvoj tón a náladu",
      "Vyhodnocuje pachovú stopu vo vzduchu",
    ],
    correctIndex: 2,
  },
];
