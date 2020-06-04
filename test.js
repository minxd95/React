const { cat, dog, tiger, monkey = "monkey" } = {
  cat: "CAT",
  dog: "DOG",
  tiger: "TIGER",
};
console.log(cat); // CAT
console.log(dog); // DOG
console.log(tiger); // TIGER
console.log(monkey); // MONKEY
