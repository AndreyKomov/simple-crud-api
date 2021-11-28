const { v4 } = require("uuid");
const Router = require("../router");
const pesonsDataBase = require("../../persons");

const messages = {
  invalidData: { message: "invalid data. Please, check your request." },
  invalidBody: { message: "invalid body request" },
  invalidID: { message: "invalid person ID" },
  invalidPerson: { message: "person not found" },
  person: "/person",
};

function findPersonById(personsArray, personId) {
  return personsArray.find(
    (person) => person.id.toString() === personId.toString()
  );
}

function checkData(person) {
  let result = true;

  if (typeof person.name !== "string") {
    result = false;
  } else if (typeof person.age !== "number") {
    result = false;
  } else if (!Array.isArray(person.hobbies)) {
    result = false;
  } else if (!checkIsHobbyString(person.hobbies)) {
    result = false;
  }

  return result;
}

function checkIsHobbyString (hobbiesArray) {
  if (array.length === 0) {
    return true;
  }

  let checkingResult = true;
  hobbiesArray.forEach((hobby) => {
    if (typeof hobby !== "string") {
      checkingResult = false;
    }
  });
  return checkingResult;
};

function updatePerson(array, person) {
  const currentPerson = array.find((pers) => pers.id === person.id);

  if (!currentPerson) {
    return null;
  }

  currentPerson.name = person.name;
  currentPerson.age = person.age;
  currentPerson.hobbies = person.hobbies;

  return currentPerson;
}

function deletePerson(array, personID) {
    const person = findPersonById(array, personID);
    const personIndex = array.indexOf(person);
    if (personIndex !== -1) {
        array.splice(personIndex, 1);
        return true;
    }
    return false;
}

function checkIsValidID(id) {
    return /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/.test(id);  //https://www.npmjs.com/package/uuid + stack overflow
}

const router = new Router();

router.get(messages.person, (req, res) => {
  try {
    if (req.personId) {
      if (checkIsValidID(req.personId)) {
        let person = findPersonById(pesonsDataBase, req.personId);
        res.statusCode = person ? 200 : 404;
        res.send(person ? person : messages.invalidPerson);
      } else {
        res.statusCode = 400;
        res.send(messages.invalidID);
      }
    } else {
      res.statusCode = 200;
      res.send(pesonsDataBase);
    }
  } catch (e) {
    console.log("error", e);
    res.statusCode = 500;
    res.send();
  }
});

router.post(messages.person, (req, res) => {
  try {
    if (checkData(req.body)) {
      res.statusCode = 201;
      req.body.id = v4();
      pesonsDataBase.push(req.body);
      res.send(req.body);
    } else {
      res.statusCode = 400;
      res.send(messages.invalidBody);
    }
  } catch (e) {
    console.log("error", e);
    res.statusCode = 500;
    res.send();
  }
});

router.put(messages.person, (req, res) => {
  try {
    if (req.personId) {
      if (checkIsValidID(req.personId)) {
        const newPersonData = req.body;
        newPersonData.id = req.personId;

        const newPerson = updatePerson(pesonsDataBase, newPersonData);
        res.statusCode = updatedPerson ? 200 : 404;
        res.send(
            newPerson ? newPerson : messages.invalidPerson
        );
      } else {
        res.statusCode = 400;
        res.send(messages.invalidID);
      }
    } else {
      res.statusCode = 400;
      res.send(messages.invalidData);
    }
  } catch (e) {
    console.log("error", e);
    res.statusCode = 500;
    res.send();
  }
});

router.delete(messages.person, (req, res) => {
  try {
    if (req.personId) {
      if (checkIsValidID(req.personId)) {
        const delPers = deletePerson(pesonsDataBase, req.personId);
        res.statusCode = delPers ? 204 : 404;
        res.send(delPers ? "" : messages.invalidPerson);
      } else {
        res.statusCode = 400;
        res.send(messages.invalidData);
      }
    } else {
      res.statusCode = 400;
      res.send(messages.invalidData);
    }
  } catch (e) {
    console.log("error", e);
    res.statusCode = 500;
    res.send();
  }
});

module.exports = router;
// export { router };
