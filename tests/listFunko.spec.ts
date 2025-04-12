import { describe, test, expect } from "vitest";
import { checkPath, listFunko} from "../src/funkoFunctions";
import { FunkoPop } from "../src/funkoPop";
import { funkoType, gender } from "../src/funkoPop";

let funko: FunkoPop[] = [
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
]

describe("Asynchronous function listFunko", () => {
  test("listFunko should return the list of funkos", () => {
    return checkPath('TestUser2', 1).then((datos) => {
      return listFunko(datos[0]).then((response) => {
        expect(response.funkoPops).toEqual(funko);
      });
    });
  });
  test("listFunko should handle errors", () => {
    return checkPath('TestUser3', 1).then((datos) => {
      return listFunko(datos[0]).catch((response) => {
        expect(response.success).toBe(false)
        expect(response.error).toBe('Error: the user TestUser3\'s list is empty')
      });
    });
  });
})