const happyGifs = [
  "https://media1.tenor.com/m/0hCQWP-dg00AAAAd/dog-dance.gif",
  "https://media1.tenor.com/m/oz5hfIu4ongAAAAd/party-time-dog-party.gif",
  "https://media1.tenor.com/m/juqLlAHr2jUAAAAC/dogs-dogs-party.gif",
];

const mehGifs = [
  "https://media1.tenor.com/m/Du-raxYKEigAAAAC/meh-idc.gif",
  "https://media1.tenor.com/m/eFQWTWtOxc0AAAAd/meh-im-sorry.gif",
  "https://media1.tenor.com/m/eEgobI6WTqUAAAAd/akita-lazy.gif",
  "https://media1.tenor.com/m/VpB3BKVL-lUAAAAd/dog-dogs.gif",
];

const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const getResultDog = (percentage: number) => {
  if (percentage === 100) {
    return {
      src: getRandom(happyGifs),
      alt: "Tancujúci psík",
      text: "Psia reč je tvoj druhý jazyk 🐶✨",
    };
  }

  if (percentage >= 80) {
    return {
      src: getRandom(happyGifs),
      alt: "Šťastný psík",
      text: "Super! Máš veľmi dobré znalosti 👏",
    };
  }

  if (percentage >= 50) {
    return {
      src: getRandom(mehGifs),
      alt: "Psík – celkom fajn",
      text: "Nabudúce to môže byť ešte lepšie 🙂",
    };
  }

  return {
    src: getRandom(mehGifs),
    alt: "Psík povzbudzuje – skús to znova",
  };
};
export default getResultDog;
