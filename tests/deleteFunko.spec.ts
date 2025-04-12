import { describe, test, expect } from "vitest";
import { addFunko, checkPath, deleteFunko} from "../src/funkoFunctions";
import { FunkoPop } from "../src/funkoPop";
import { funkoType, gender } from "../src/funkoPop";

let funko: FunkoPop = {
  "id": 1,
  "nombre": "Shadow",
  "descripcion": "The dark sonic",
  "tipo": funkoType.POP,
  "genero": gender.ANIMACION,
  "franquicia": "Sonic the hedgehog",
  "numero": 1,
  "esExclusivo": false,
  "caracteristicasEspeciales": "_",
  "valorMercado": 1
}

describe("Asynchronous function deleteFunko", () => {
  test("deleteFunko should remove succesfully a funko", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
      checkPath('TestUser2', 1, funko).then((datos) => {
        return deleteFunko(datos[0], datos[1] as number).then((response) => {
        expect(response.success).toBe(true);
        expect(response.error).toBe('');
        resolve(response);
        });
      });
      }, 1000); // Timeout of 1 second
    });
  });
  test("deleteFunko should handle errors", () => {
    return checkPath('TestUser2', 1, funko).then((datos) => {
      return deleteFunko(datos[0], datos[1] as number).catch((response) => {
        expect(response.success).toBe(false)
        expect(response.error).toBe('Error: funko with ID 1 was not in the list')
        //adding again the funko
        return addFunko(datos[2] as FunkoPop, datos[0]).then((response) => {});
      });
    });
  });
})