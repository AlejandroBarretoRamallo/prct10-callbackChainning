import { describe, test, expect, afterAll } from "vitest";
import { addFunko, deleteFunko} from "../src/funkoFunctions";
import { FunkoPop } from "../src/funkoPop";
import { funkoType, gender } from "../src/funkoPop";
import { checkPath } from "../src/funkoFunctions";

let funko: FunkoPop = 
  {
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

describe("Asynchronous function coordinatesInfoPromises", () => {
  test("addFunko should add succesfully a funko", () => {
    return checkPath('TestUser1', 1, funko).then((datos) => {
      return addFunko(datos[2] as FunkoPop, datos[0]).then((response) => {
        expect(response.success).toBe(true)
        expect(response.error).toBe('')
      })
    });
  });
  test("addFunko should handle errors", () => {
    return checkPath('TestUser1', 1, funko).then((datos) => {
      return addFunko(funko, 'TestUser1').catch((response) => {
        expect(response.success).toBe(false)
        expect(response.error).toBe('Error: funko already added')
        //deleting the funko
        return deleteFunko('TestUser1', 1).then((response) => {
          expect(response.success).toBe(true)
          expect(response.error).toBe('')
        })
      });
    });
  });
})