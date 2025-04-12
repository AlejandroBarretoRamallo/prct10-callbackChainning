import { describe, test, expect } from "vitest";
import { checkPath} from "../src/funkoFunctions";
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

describe("Asynchronous function checkPath", () => {
  test("checkPath should return user data and funko details", () => {
    return checkPath('TestUser1', 1, funko).then((datos) => {
      expect(datos.length).toBe(3)
      expect(datos[0]).toEqual('TestUser1')
      expect(datos[1]).toEqual(1)
      expect(datos[2]).toEqual(funko)
    });
  });
})