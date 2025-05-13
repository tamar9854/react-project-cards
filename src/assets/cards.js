import card1 from "./card-pic1.jpg";
import card2 from "./card-pic2.jpg";
import card3 from "./card-pic3.jpg";
import cardLogo from "./businessLogo.jpg";

export const dummyCards = [
  {
    id: 1,
    title: "card1",
    subtitle: "card a",
    phone: "0541234567",
    address: { street: "aaa st 3" },
    img: cardLogo,
    owner: "1q2w3e",
    likes: [],
  },
  {
    id: 2,
    title: "card2",
    subtitle: "card b",
    phone: "0541234567",
    address: { street: "aaa st 3" },
    img: cardLogo,
    owner: "1q2w3f",
    likes: [],
  },
  {
    id: 3,
    title: "card3",
    subtitle: "card c",
    phone: "0541234567",
    address: { street: "aaa st 3" },
    img: cardLogo,
    owner: "1q2w3e",
    likes: ["1q2w3f"],
  },
  {
    id: 4,
    title: "card4",
    subtitle: "card d",
    phone: "0541234567",
    address: { street: "aaa st 3" },
    img: cardLogo,
    owner: "1q2w3f",
    likes: ["1q2w3e"],
  },
  {
    id: 5,
    title: "card5",
    subtitle: "card e",
    phone: "0541234567",
    address: { street: "aaa st 3" },
    img: cardLogo,
    owner: "1q2w3f",
    likes: ["1q2w3e"],
  },
];
