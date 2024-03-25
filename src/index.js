import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsAll = await listContacts();
      console.table(contactsAll);
      break;

    case "get":
      const getContacts = await getContactById(id);
      console.table(getContacts);
      break;

    case "add":
      const add_Contact = await addContact(name, email, phone);
      console.table(add_Contact);
      break;

    case "remove":
      const remove_Contact = removeContact(id);
      remove_Contact.then((data) => {
        console.table(data);
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  
  }
}

invokeAction(options);
