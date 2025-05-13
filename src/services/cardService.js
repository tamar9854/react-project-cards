import httpService from "./httpService";

async function createCard(values) {
  const token = getToken();
  const res = await httpService.post("/cards", values, {
    headers: { "x-auth-token": token },
  });
  return res;
}

async function toggleLike(cardid) {
  const token = getToken();
  const res = await httpService.patch("/cards/" + cardid, null, {
    headers: { "x-auth-token": token },
  });
  return res;
}

async function updateBiznum(cardid, bizNumber) {
  const res = await httpService.patch("/cards/" + cardid, bizNumber);
  return res;
}

async function updateCard(cardId, card) {
  const token = getToken();
  const res = await httpService.put("/cards/" + cardId, card, {
    headers: { "x-auth-token": token },
  });
  return res;
}

async function deleteCard(cardid) {
  const token = getToken();
  const res = await httpService.delete("/cards/" + cardid, {
    headers: { "x-auth-token": token },
  });
  return res;
}

async function getAllCards() {
  const res = await httpService.get("/cards");
  return res;
}

async function getCardbyId(cardid) {
  const token = getToken();
  const res = await httpService.get("/cards/" + cardid, {
    headers: { "x-auth-token": token },
  });
  return res;
}

async function getAllmycards() {
  const token = getToken();
  const res = await httpService.get("/cards/my-cards", {
    headers: { "x-auth-token": token },
  });
  return res;
}

const getToken = () => {
  const TOKEN_KEY = "token";

  return localStorage.getItem(TOKEN_KEY);
};
const cardService = {
  createCard,
  toggleLike,
  updateBiznum,
  updateCard,
  deleteCard,
  getAllmycards,
  getAllCards,
  getCardbyId,
};

export default cardService;
