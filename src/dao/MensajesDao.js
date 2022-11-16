import { writeFile, readFile } from "node:fs/promises";

export class MensajesDao {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(message, authorData) {
    try {
      const messages = await this.ReadAll();
      let newId;
      if (messages.length == 0) {
        newId = 1;
      } else {
        const ultimoId = messages[messages.length - 1].author.id;
        console.log(ultimoId);
        newId = ultimoId + 1;
      }
      const mensajeFinal = {
        author: {
          id: newId,
          nombre: authorData.nombre,
          apellido: authorData.apellido,
          edad: authorData.edad,
          alias: authorData.alias,
          avatar: authorData.avatar,
        },
        text: message,
      };
      messages.push(mensajeFinal);
      await writeFile(this.ruta, JSON.stringify(messages, null, 2));
      console.log(mensajeFinal);
      return mensajeFinal;
    } catch (err) {
      console.log(err);
    }
  }
  async ReadAll() {
    const messages = await readFile(this.ruta, "utf-8");
    return JSON.parse(messages);
  }
}

export default MensajesDao;
