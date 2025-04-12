import { describe, test, expect } from "vitest";
import { addFunko, checkPath, modifyFunko, deleteFunko} from "../src/funkoFunctions";
import { FunkoPop } from "../src/funkoPop";
import { funkoType, gender } from "../src/funkoPop";

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

let modifiedFunko: FunkoPop =
  {
  "id": 1,
  "nombre": "Shadow2",
  "descripcion": "The dark sonic",
  "tipo": funkoType.POP,
  "genero": gender.ANIMACION,
  "franquicia": "Sonic the hedgehog",
  "numero": 1,
  "esExclusivo": false,
  "caracteristicasEspeciales": "_",
  "valorMercado": 1
}

let funko2: FunkoPop =
  {
  "id": 2,
  "nombre": "Shadow2",
  "descripcion": "The dark sonic",
  "tipo": funkoType.POP,
  "genero": gender.ANIMACION,
  "franquicia": "Sonic the hedgehog",
  "numero": 2,
  "esExclusivo": false,
  "caracteristicasEspeciales": "_",
  "valorMercado": 1
  }
  
  

describe("Asynchronous function modifyFunko", () => {
  test("modifyFunko should return the modified funko", () => {
    return checkPath('TestUser4', 1, funko).then((datos) => {
      return addFunko(datos[2] as FunkoPop, 'TestUser4').then((response) => {
        expect(response.success).toBe(true);
        return modifyFunko(datos[0], modifiedFunko).then((response) => {
          expect(response.success).toBe(true);
          return deleteFunko(datos[0], 1).then((response) => {
            expect(response.success).toBe(true);
          });
        });
      });
    });
  });
  test("listFunko should handle errors", () => {
    return checkPath('TestUser2', 2, funko2).then((datos) => {
      return modifyFunko(datos[0], datos[2] as FunkoPop).catch((response) => {
        expect(response.success).toBe(false)
        expect(response.error).toBe('Error: the funko 2 is not registered on the list')
      });
    });
  });
})